import numpy as np
import pandas as pd
from typing import Dict, List, Optional, Tuple
from datetime import datetime
import httpx
import os
from openai import OpenAI

class SentimentAnalyzer:
    """Analyzes market sentiment from multiple sources"""
    
    def __init__(self):
        self.openai_client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        
        # Sentiment keywords
        self.bullish_keywords = [
            'bullish', 'moon', 'pump', 'breakout', 'rally', 'surge',
            'buy', 'long', 'accumulation', 'undervalued', 'adoption',
            'partnership', 'listing', 'upgrade', 'halving', 'etf'
        ]
        
        self.bearish_keywords = [
            'bearish', 'dump', 'crash', 'correction', 'decline', 'sell',
            'short', 'distribution', 'overvalued', 'ban', 'regulation',
            'hack', 'exploit', 'delisting', 'downgrade', 'fud'
        ]
    
    async def analyze_overall_sentiment(self, coin_id: str) -> Dict:
        """Analyze overall market sentiment for a coin"""
        # Get sentiment from multiple sources
        social_sentiment = await self._get_social_sentiment(coin_id)
        news_sentiment = await self._get_news_sentiment(coin_id)
        technical_sentiment = await self._get_technical_sentiment()
        
        # Weighted combination
        overall_score = (
            social_sentiment.get('score', 0.5) * 0.4 +
            news_sentiment.get('score', 0.5) * 0.35 +
            technical_sentiment.get('score', 0.5) * 0.25
        )
        
        return {
            'coin_id': coin_id,
            'timestamp': datetime.now().isoformat(),
            'overall_score': round(float(overall_score), 3),
            'sentiment': self._classify_sentiment(overall_score),
            'components': {
                'social': social_sentiment,
                'news': news_sentiment,
                'technical': technical_sentiment
            },
            'indicators': self._get_sentiment_indicators(overall_score)
        }
    
    async def _get_social_sentiment(self, coin_id: str) -> Dict:
        """Analyze social media sentiment"""
        try:
            # Use AI to analyze social sentiment
            prompt = f"""Analyze the current social media sentiment for {coin_id} cryptocurrency.
            Consider Twitter, Reddit, and Telegram discussions.
            Return a JSON with:
            - score: 0 to 1 (0=bearish, 1=bullish)
            - confidence: 0 to 1
            - key_themes: list of dominant discussion topics
            - influencer_sentiment: majority view of influencers
            """
            
            response = self.openai_client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "You are a crypto sentiment analyst."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.3
            )
            
            result = json.loads(response.choices[0].message.content)
            return {
                'source': 'social_media',
                'score': result.get('score', 0.5),
                'confidence': result.get('confidence', 0.5),
                'key_themes': result.get('key_themes', []),
                'influencer_sentiment': result.get('influencer_sentiment', 'neutral')
            }
            
        except Exception as e:
            print(f"Error getting social sentiment: {e}")
            return {'source': 'social_media', 'score': 0.5, 'confidence': 0, 'error': str(e)}
    
    async def _get_news_sentiment(self, coin_id: str) -> Dict:
        """Analyze news sentiment"""
        try:
            prompt = f"""Analyze recent news sentiment for {coin_id} cryptocurrency.
            Consider major crypto news sites and mainstream financial media.
            Return JSON with score (0-1), confidence, and top headlines sentiment.
            """
            
            response = self.openai_client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "You are a financial news analyst."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.3
            )
            
            result = json.loads(response.choices[0].message.content)
            return {
                'source': 'news',
                'score': result.get('score', 0.5),
                'confidence': result.get('confidence', 0.5),
                'top_headlines': result.get('top_headlines', [])
            }
            
        except Exception as e:
            print(f"Error getting news sentiment: {e}")
            return {'source': 'news', 'score': 0.5, 'confidence': 0, 'error': str(e)}
    
    async def _get_technical_sentiment(self) -> Dict:
        """Analyze technical sentiment from market data"""
        try:
            # This would normally analyze technical indicators
            return {
                'source': 'technical',
                'score': 0.5,
                'indicators': {
                    'rsi': 50,
                    'macd': 'neutral',
                    'moving_averages': 'mixed'
                }
            }
        except Exception as e:
            return {'source': 'technical', 'score': 0.5, 'error': str(e)}
    
    def _classify_sentiment(self, score: float) -> str:
        """Classify sentiment score into category"""
        if score >= 0.7:
            return 'very_bullish'
        elif score >= 0.55:
            return 'bullish'
        elif score >= 0.45:
            return 'neutral'
        elif score >= 0.3:
            return 'bearish'
        else:
            return 'very_bearish'
    
    def _get_sentiment_indicators(self, score: float) -> Dict:
        """Get action indicators based on sentiment"""
        if score >= 0.7:
            return {
                'signal': 'strong_buy',
                'confidence_level': 'high',
                'risk_level': 'low',
                'description': 'Overwhelmingly positive sentiment across all sources'
            }
        elif score >= 0.55:
            return {
                'signal': 'buy',
                'confidence_level': 'moderate',
                'risk_level': 'moderate',
                'description': 'Generally positive sentiment with some caution'
            }
        elif score >= 0.45:
            return {
                'signal': 'hold',
                'confidence_level': 'low',
                'risk_level': 'high',
                'description': 'Mixed signals, wait for clearer direction'
            }
        elif score >= 0.3:
            return {
                'signal': 'sell',
                'confidence_level': 'moderate',
                'risk_level': 'moderate',
                'description': 'Negative sentiment, consider reducing exposure'
            }
        else:
            return {
                'signal': 'strong_sell',
                'confidence_level': 'high',
                'risk_level': 'low',
                'description': 'Very negative sentiment across all sources'
            }
    
    def calculate_fear_greed_index(self, market_data: Dict) -> Dict:
        """Calculate custom Fear & Greed Index"""
        # Factors: volatility, momentum, social, dominance, trends
        scores = {}
        
        # Volatility (high volatility = fear)
        if 'volatility' in market_data:
            vol = market_data['volatility']
            scores['volatility'] = max(0, min(1, 1 - vol * 10))
        
        # Market momentum
        if 'price_change_24h' in market_data:
            change = market_data['price_change_24h']
            scores['momentum'] = max(0, min(1, 0.5 + change / 20))
        
        # Bitcoin dominance
        if 'btc_dominance' in market_data:
            dom = market_data['btc_dominance']
            scores['dominance'] = max(0, min(1, 1 - (dom - 0.4) / 0.3))
        
        if scores:
            overall = np.mean(list(scores.values()))
            return {
                'index': round(float(overall * 100), 1),
                'classification': self._classify_fear_greed(overall),
                'components': scores,
                'timestamp': datetime.now().isoformat()
            }
        
        return {'index': 50, 'classification': 'neutral', 'components': {}}
    
    def _classify_fear_greed(self, score: float) -> str:
        """Classify Fear & Greed index"""
        if score >= 0.75:
            return 'extreme_greed'
        elif score >= 0.6:
            return 'greed'
        elif score >= 0.4:
            return 'neutral'
        elif score >= 0.25:
            return 'fear'
        else:
            return 'extreme_fear'

sentiment_analyzer = SentimentAnalyzer()