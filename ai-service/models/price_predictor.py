import pandas as pd
import numpy as np
from prophet import Prophet
from sklearn.metrics import mean_absolute_error, mean_squared_error
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
import json

class PricePredictor:
    """AI-powered cryptocurrency price prediction using Prophet"""
    
    def __init__(self):
        self.models = {}
        self.confidence_level = 0.95
    
    def prepare_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Prepare data for Prophet model"""
        if df.empty:
            return df
        
        prophet_df = pd.DataFrame()
        prophet_df['ds'] = df.index
        prophet_df['y'] = df['price'].values
        
        # Add floor for crypto prices
        prophet_df['floor'] = 0
        
        return prophet_df.dropna()
    
    def train_model(
        self, 
        coin_id: str, 
        df: pd.DataFrame,
        changepoint_prior_scale: float = 0.05,
        seasonality_mode: str = 'multiplicative'
    ) -> Optional[Prophet]:
        """Train Prophet model for a coin"""
        try:
            prophet_df = self.prepare_data(df)
            
            if len(prophet_df) < 30:
                print(f"Insufficient data for {coin_id}")
                return None
            
            model = Prophet(
                changepoint_prior_scale=changepoint_prior_scale,
                seasonality_mode=seasonality_mode,
                yearly_seasonality=True,
                weekly_seasonality=True,
                daily_seasonality=False,
                interval_width=self.confidence_level
            )
            
            # Add custom seasonality for crypto markets
            model.add_seasonality(
                name='monthly',
                period=30.5,
                fourier_order=5
            )
            
            model.fit(prophet_df)
            
            # Store model
            self.models[coin_id] = {
                'model': model,
                'trained_at': datetime.now(),
                'data_points': len(prophet_df)
            }
            
            return model
            
        except Exception as e:
            print(f"Error training model for {coin_id}: {e}")
            return None
    
    def predict(
        self, 
        coin_id: str, 
        days: int = 7,
        include_components: bool = False
    ) -> Optional[Dict]:
        """Generate price predictions"""
        if coin_id not in self.models:
            return None
        
        model_data = self.models[coin_id]
        model = model_data['model']
        
        try:
            # Create future dataframe
            future = model.make_future_dataframe(
                periods=days * 24,  # Hourly predictions
                freq='H'
            )
            
            # Make prediction
            forecast = model.predict(future)
            
            # Extract relevant predictions
            future_forecast = forecast.tail(days * 24)
            
            predictions = {
                'coin_id': coin_id,
                'generated_at': datetime.now().isoformat(),
                'training_points': model_data['data_points'],
                'trained_at': model_data['trained_at'].isoformat(),
                'predictions': [],
                'summary': self._generate_summary(forecast, days)
            }
            
            # Daily aggregated predictions
            for i in range(days):
                day_data = future_forecast.iloc[i*24:(i+1)*24]
                
                prediction_point = {
                    'date': (datetime.now() + timedelta(days=i+1)).strftime('%Y-%m-%d'),
                    'predicted_price': float(day_data['yhat'].mean()),
                    'lower_bound': float(day_data['yhat_lower'].min()),
                    'upper_bound': float(day_data['yhat_upper'].max()),
                    'confidence': self._calculate_confidence(day_data)
                }
                predictions['predictions'].append(prediction_point)
            
            if include_components:
                predictions['components'] = self._extract_components(model, forecast)
            
            return predictions
            
        except Exception as e:
            print(f"Error predicting for {coin_id}: {e}")
            return None
    
    def _generate_summary(self, forecast: pd.DataFrame, days: int) -> Dict:
        """Generate prediction summary"""
        last_price = forecast.iloc[0]['yhat']
        future_prices = forecast.tail(days * 24)['yhat']
        final_price = future_prices.iloc[-1]
        
        price_change = final_price - last_price
        price_change_pct = (price_change / last_price) * 100
        
        return {
            'current_price': float(last_price),
            'predicted_price': float(final_price),
            'price_change': float(price_change),
            'price_change_percentage': float(price_change_pct),
            'trend': 'bullish' if price_change > 0 else 'bearish',
            'strength': self._calculate_trend_strength(price_change_pct),
            'volatility': float(forecast['yhat'].std()),
            'confidence_score': self._calculate_overall_confidence(forecast, days)
        }
    
    def _calculate_confidence(self, day_data: pd.DataFrame) -> float:
        """Calculate confidence for a single prediction"""
        range_width = day_data['yhat_upper'].mean() - day_data['yhat_lower'].mean()
        predicted = day_data['yhat'].mean()
        
        if predicted > 0:
            relative_range = range_width / predicted
            confidence = max(0, min(1, 1 - relative_range))
            return round(float(confidence), 3)
        return 0.5
    
    def _calculate_trend_strength(self, change_pct: float) -> str:
        """Categorize trend strength"""
        abs_change = abs(change_pct)
        if abs_change > 20:
            return 'very_strong'
        elif abs_change > 10:
            return 'strong'
        elif abs_change > 5:
            return 'moderate'
        elif abs_change > 2:
            return 'weak'
        else:
            return 'neutral'
    
    def _calculate_overall_confidence(self, forecast: pd.DataFrame, days: int) -> float:
        """Calculate overall prediction confidence"""
        future = forecast.tail(days * 24)
        avg_interval_width = (future['yhat_upper'] - future['yhat_lower']).mean()
        avg_price = future['yhat'].mean()
        
        if avg_price > 0:
            return round(float(max(0, min(1, 1 - (avg_interval_width / avg_price)))), 3)
        return 0.3
    
    def _extract_components(self, model: Prophet, forecast: pd.DataFrame) -> Dict:
        """Extract model components for visualization"""
        try:
            components = {
                'trend': forecast['trend'].tolist()[-168:],  # Last 7 days hourly
                'weekly': forecast['weekly'].tolist()[-168:] if 'weekly' in forecast else [],
                'yearly': forecast['yearly'].tolist()[-168:] if 'yearly' in forecast else []
            }
            return components
        except Exception:
            return {}
    
    def backtest(
        self, 
        coin_id: str, 
        df: pd.DataFrame,
        test_days: int = 30
    ) -> Optional[Dict]:
        """Backtest the model performance"""
        try:
            # Split data
            train_df = df[:-test_days]
            test_df = df[-test_days:]
            
            # Train on training data
            model = self.train_model(f"{coin_id}_backtest", train_df)
            
            if model is None:
                return None
            
            # Make predictions for test period
            future = model.make_future_dataframe(periods=test_days, freq='D')
            forecast = model.predict(future)
            
            # Get predictions for test period
            test_forecast = forecast.tail(test_days)
            
            # Calculate metrics
            actual = test_df['price'].values
            predicted = test_forecast['yhat'].values
            
            mae = mean_absolute_error(actual, predicted)
            rmse = np.sqrt(mean_squared_error(actual, predicted))
            mape = np.mean(np.abs((actual - predicted) / actual)) * 100
            
            return {
                'coin_id': coin_id,
                'test_days': test_days,
                'metrics': {
                    'mae': float(mae),
                    'rmse': float(rmse),
                    'mape': float(mape),
                    'accuracy': float(max(0, 100 - mape))
                },
                'actual_prices': actual.tolist(),
                'predicted_prices': predicted.tolist()
            }
            
        except Exception as e:
            print(f"Error backtesting {coin_id}: {e}")
            return None

# Singleton instance
price_predictor = PricePredictor()