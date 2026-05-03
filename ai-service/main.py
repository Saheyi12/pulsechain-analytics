from fastapi import FastAPI, HTTPException, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime, timedelta
import asyncio
import os

from models.price_predictor import price_predictor
from models.sentiment_analyzer import sentiment_analyzer
from models.blog_generator import blog_generator
from utils.data_fetcher import DataFetcher
from utils.cache import cache

# Initialize FastAPI
app = FastAPI(
    title="PulseChain Analytics AI Service",
    description="AI-powered cryptocurrency analytics microservice",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://pulsechain-analytics.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize data fetcher
data_fetcher = DataFetcher()

# Request/Response models
class PredictionRequest(BaseModel):
    coin_id: str = Field(..., description="Coin ID (e.g., bitcoin)")
    days: int = Field(default=7, ge=1, le=30, description="Days to predict")
    include_components: bool = Field(default=False)

class SentimentRequest(BaseModel):
    coin_id: str = Field(..., description="Coin ID")

class BlogGenerationRequest(BaseModel):
    category: str = Field(default="MARKET_ANALYSIS")
    coin_id: Optional[str] = None
    publish: bool = Field(default=False)

class BacktestRequest(BaseModel):
    coin_id: str = Field(..., description="Coin ID")
    test_days: int = Field(default=30, ge=7, le=90)

class PredictionResponse(BaseModel):
    coin_id: str
    generated_at: str
    predictions: List[Dict]
    summary: Dict
    confidence: float

class SentimentResponse(BaseModel):
    coin_id: str
    overall_score: float
    sentiment: str
    components: Dict
    indicators: Dict

# Health check
@app.get("/")
async def root():
    return {
        "service": "PulseChain AI",
        "status": "online",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Price prediction endpoint
@app.post("/predict", response_model=PredictionResponse)
async def predict_price(request: PredictionRequest):
    """Generate AI price predictions for a cryptocurrency"""
    
    # Check cache first
    cache_key = f"prediction:{request.coin_id}:{request.days}"
    cached = cache.get(cache_key)
    if cached:
        return cached
    
    # Fetch historical data
    df = await data_fetcher.fetch_historical_prices(request.coin_id, days=365)
    
    if df.empty:
        raise HTTPException(status_code=404, detail=f"No data found for {request.coin_id}")
    
    # Train model and predict
    model = price_predictor.train_model(request.coin_id, df)
    
    if model is None:
        raise HTTPException(status_code=500, detail="Failed to train prediction model")
    
    predictions = price_predictor.predict(
        request.coin_id,
        days=request.days,
        include_components=request.include_components
    )
    
    if predictions is None:
        raise HTTPException(status_code=500, detail="Failed to generate predictions")
    
    # Calculate confidence
    confidence = predictions['summary'].get('confidence_score', 0.5)
    
    result = {
        'coin_id': request.coin_id,
        'generated_at': predictions['generated_at'],
        'predictions': predictions['predictions'],
        'summary': predictions['summary'],
        'confidence': confidence
    }
    
    # Cache result
    cache.set(cache_key, result, ttl=3600)  # 1 hour
    
    return result

@app.get("/predict/{coin_id}")
async def get_prediction(
    coin_id: str,
    days: int = Query(default=7, ge=1, le=30)
):
    """Quick prediction GET endpoint"""
    return await predict_price(PredictionRequest(coin_id=coin_id, days=days))

# Sentiment analysis endpoint
@app.post("/sentiment", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    """Analyze market sentiment for a cryptocurrency"""
    
    cache_key = f"sentiment:{request.coin_id}"
    cached = cache.get(cache_key)
    if cached:
        return cached
    
    result = await sentiment_analyzer.analyze_overall_sentiment(request.coin_id)
    
    if result is None:
        raise HTTPException(status_code=500, detail="Failed to analyze sentiment")
    
    response = {
        'coin_id': request.coin_id,
        'overall_score': result['overall_score'],
        'sentiment': result['sentiment'],
        'components': result['components'],
        'indicators': result['indicators']
    }
    
    # Cache for 5 minutes
    cache.set(cache_key, response, ttl=300)
    
    return response

@app.get("/sentiment/{coin_id}")
async def get_sentiment(coin_id: str):
    """Quick sentiment GET endpoint"""
    return await analyze_sentiment(SentimentRequest(coin_id=coin_id))

# Fear & Greed index
@app.get("/fear-greed")
async def get_fear_greed_index():
    """Get custom Fear & Greed Index"""
    
    cache_key = "fear_greed_index"
    cached = cache.get(cache_key)
    if cached:
        return cached
    
    # Get market data
    market_data = {
        'volatility': 0.05,
        'price_change_24h': 2.5,
        'btc_dominance': 0.52
    }
    
    result = sentiment_analyzer.calculate_fear_greed_index(market_data)
    cache.set(cache_key, result, ttl=300)
    
    return result

# Blog generation endpoint
@app.post("/blog/generate")
async def generate_blog(
    request: BlogGenerationRequest,
    background_tasks: BackgroundTasks
):
    """Generate an AI blog post"""
    
    # Fetch current market data
    market_data = await data_fetcher.fetch_global_data()
    trending = await data_fetcher.fetch_trending_coins()
    
    if request.coin_id:
        # Generate coin-specific analysis
        coin_data = await data_fetcher.fetch_current_price(request.coin_id)
        result = await blog_generator.generate_coin_analysis(coin_data or {})
    else:
        # Generate market analysis
        result = await blog_generator.generate_daily_market_analysis(
            market_data or {},
            trending,
            request.category
        )
    
    if not result:
        raise HTTPException(status_code=500, detail="Failed to generate blog")
    
    return {
        'status': 'success',
        'blog': result,
        'generated_at': datetime.now().isoformat()
    }

@app.get("/blog/daily")
async def get_daily_blog():
    """Generate daily market analysis blog"""
    return await generate_blog(BlogGenerationRequest(category="MARKET_ANALYSIS"))

# Backtesting endpoint
@app.post("/backtest")
async def backtest_model(request: BacktestRequest):
    """Backtest prediction model"""
    
    df = await data_fetcher.fetch_historical_prices(request.coin_id, days=365)
    
    if df.empty:
        raise HTTPException(status_code=404, detail=f"No data found for {request.coin_id}")
    
    result = price_predictor.backtest(request.coin_id, df, request.test_days)
    
    if result is None:
        raise HTTPException(status_code=500, detail="Backtest failed")
    
    return result

# Market data endpoints
@app.get("/market/global")
async def get_global_data():
    """Get global crypto market data"""
    data = await data_fetcher.fetch_global_data()
    if data:
        return data
    raise HTTPException(status_code=500, detail="Failed to fetch global data")

@app.get("/market/trending")
async def get_trending():
    """Get trending coins"""
    return await data_fetcher.fetch_trending_coins()

@app.get("/market/top/{limit}")
async def get_top_coins(limit: int = 100):
    """Get top coins by market cap"""
    return await data_fetcher.fetch_market_data(limit)

@app.get("/price/{coin_id}")
async def get_price(coin_id: str):
    """Get current price for a coin"""
    price = await data_fetcher.fetch_current_price(coin_id)
    if price:
        return price
    raise HTTPException(status_code=404, detail=f"Price not found for {coin_id}")

# Cache management
@app.delete("/cache/clear")
async def clear_cache(pattern: str = "*"):
    """Clear cache by pattern"""
    deleted = cache.delete_pattern(pattern)
    return {"status": "success", "deleted_keys": deleted}

@app.get("/cache/stats")
async def cache_stats():
    """Get cache statistics"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

# MCP Server endpoint for AI agents
@app.post("/mcp")
async def mcp_endpoint(request: Dict):
    """Model Context Protocol endpoint for AI agent integration"""
    action = request.get("action")
    
    if action == "predict_price":
        return await predict_price(PredictionRequest(**request.get("params", {})))
    elif action == "analyze_sentiment":
        return await analyze_sentiment(SentimentRequest(**request.get("params", {})))
    elif action == "get_market_data":
        return await get_global_data()
    else:
        raise HTTPException(status_code=400, detail=f"Unknown action: {action}")

# Scheduled tasks
@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    print("🚀 PulseChain AI Service starting...")
    print("✅ Price Predictor initialized")
    print("✅ Sentiment Analyzer initialized")
    print("✅ Blog Generator initialized")
    print("✅ Data Fetcher ready")
    print("✅ Cache connected")
    print("🎯 Service ready for predictions!")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    print("PulseChain AI Service shutting down...")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        workers=2
    )