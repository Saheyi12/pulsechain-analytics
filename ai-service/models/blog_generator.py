from openai import OpenAI
import os
from datetime import datetime
from typing import Dict, Optional, List
import json
import re

class BlogGenerator:
    """AI-powered blog post generator for crypto market analysis"""
    
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    
    async def generate_daily_market_analysis(
        self,
        market_data: Dict,
        trending_coins: List[Dict],
        category: str = "MARKET_ANALYSIS"
    ) -> Dict:
        """Generate daily market analysis blog post"""
        
        prompt = f"""You are a professional cryptocurrency market analyst and financial writer.
        
        Generate a comprehensive daily market analysis blog post based on this data:
        
        Market Data: {json.dumps(market_data, indent=2)}
        Trending Coins: {json.dumps(trending_coins[:5], indent=2)}
        
        Requirements:
        1. Title: SEO-optimized, include top-performing coin name, create urgency
        2. Length: 1500-2000 words with proper markdown formatting
        3. Structure:
           - Executive Summary (2-3 sentences)
           - Market Overview with key metrics
           - Top Performers Analysis
           - Top Losers Analysis
           - Bitcoin Analysis
           - DeFi Sector Update
           - AI Price Predictions for next 7 days
           - Key Events to Watch
           - Trading Tips
           - Conclusion with actionable insights
           - Disclaimer about investment risks
        4. Include: Tables for price data, bullet points for key takeaways
        5. Tone: Professional, data-driven, slightly bullish on crypto long-term
        6. Add "Key Takeaways" section with 5 bullet points
        7. Include affiliate disclosure: "This article may contain affiliate links"
        
        Return JSON:
        {{
            "title": "SEO-optimized title (60 chars max)",
            "excerpt": "Compelling meta description (160 chars max)",
            "content": "Full markdown blog content",
            "tags": ["tag1", "tag2", ...],
            "seo_title": "Title tag for SEO",
            "seo_description": "Meta description",
            "category": "{category}",
            "reading_time": estimated_minutes,
            "featured_coin": "main_coin_id"
        }}
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {
                        "role": "system", 
                        "content": "You are an expert crypto analyst and financial journalist. Write data-driven, engaging content."
                    },
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.7,
                max_tokens=4000
            )
            
            result = json.loads(response.choices[0].message.content)
            
            # Enhance with internal linking opportunities
            result['content'] = self._add_internal_linking_opportunities(result['content'])
            
            # Add affiliate marketing
            result['content'] = self._add_affiliate_opportunities(result['content'])
            
            # Add schema markup
            result['schema_markup'] = self._generate_article_schema(result)
            
            return result
            
        except Exception as e:
            print(f"Error generating blog post: {e}")
            return self._get_fallback_blog()
    
    async def generate_coin_analysis(self, coin_data: Dict) -> Dict:
        """Generate in-depth analysis for a specific coin"""
        
        prompt = f"""Generate a comprehensive cryptocurrency analysis for:
        
        Coin Data: {json.dumps(coin_data, indent=2)}
        
        Include:
        1. Project Overview
        2. Technical Analysis (support/resistance levels)
        3. Fundamental Analysis
        4. Price Prediction (short and long term)
        5. Competitor Comparison
        6. Risk Assessment
        7. Investment Thesis
        
        Return JSON with title, content, and analysis scores.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "You are a crypto research analyst."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.5,
                max_tokens=3000
            )
            
            return json.loads(response.choices[0].message.content)
            
        except Exception as e:
            print(f"Error generating coin analysis: {e}")
            return {}
    
    async def generate_news_roundup(self, news_items: List[Dict]) -> Dict:
        """Generate daily news roundup"""
        
        prompt = f"""Create a daily crypto news roundup from these items:
        
        {json.dumps(news_items[:10], indent=2)}
        
        Structure:
        - Top Story (detailed analysis)
        - Market Moving News (3-4 items)
        - Regulatory Updates
        - DeFi/NFT News
        - Exchange News
        - Quick Bites (brief mentions)
        
        Return JSON with title and content.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "You are a crypto news editor."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.5,
                max_tokens=2000
            )
            
            return json.loads(response.choices[0].message.content)
            
        except Exception as e:
            print(f"Error generating news roundup: {e}")
            return {}
    
    def _add_internal_linking_opportunities(self, content: str) -> str:
        """Add internal linking suggestions"""
        linking_rules = [
            ('Bitcoin', '/coin/bitcoin'),
            ('Ethereum', '/coin/ethereum'),
            ('DeFi', '/blog?category=DEFI'),
            ('NFT', '/blog?category=NFT'),
            ('price prediction', '/predictions'),
            ('market analysis', '/blog?category=MARKET_ANALYSIS'),
            ('portfolio', '/portfolio'),
            ('trading strategy', '/blog?category=TUTORIAL'),
        ]
        
        for term, link in linking_rules:
            # Only link first occurrence
            if term.lower() in content.lower():
                content = content.replace(
                    term,
                    f'[{term}]({link})',
                    1
                )
        
        return content
    
    def _add_affiliate_opportunities(self, content: str) -> str:
        """Add contextual affiliate marketing"""
        affiliate_links = [
            "\n\n---\n*💡 Trade with confidence: [Get started with Binance](https://www.binance.com/en/register?ref=DEFAULT) and receive 10% off trading fees.*",
            "\n*🔐 Secure your crypto: [Get a Ledger hardware wallet](https://shop.ledger.com?r=DEFAULT) for maximum security.*",
        ]
        
        # Add one affiliate link near the end
        content += "\n" + self._get_contextual_affiliate(content)
        
        return content
    
    def _get_contextual_affiliate(self, content: str) -> str:
        """Get contextual affiliate link based on content"""
        if 'security' in content.lower() or 'wallet' in content.lower():
            return "*🔐 **Security Tip**: Protect your crypto with a [Ledger hardware wallet](https://shop.ledger.com?r=DEFAULT). Not your keys, not your coins!*\n"
        else:
            return "*💡 **Trading Tip**: Execute your trades on [Binance](https://www.binance.com/en/register?ref=DEFAULT) - the world's largest crypto exchange with lowest fees.*\n"
    
    def _generate_article_schema(self, article: Dict) -> Dict:
        """Generate JSON-LD schema for SEO"""
        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.get('title', ''),
            "description": article.get('excerpt', ''),
            "author": {
                "@type": "Organization",
                "name": "PulseChain Analytics"
            },
            "publisher": {
                "@type": "Organization",
                "name": "PulseChain Analytics",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://pulsechain-analytics.vercel.app/logo.svg"
                }
            },
            "datePublished": datetime.now().isoformat(),
            "dateModified": datetime.now().isoformat()
        }
    
    def _get_fallback_blog(self) -> Dict:
        """Get fallback blog post when generation fails"""
        return {
            "title": "Daily Crypto Market Update",
            "excerpt": "Today's cryptocurrency market analysis covering Bitcoin, Ethereum, and top performing altcoins.",
            "content": "# Daily Crypto Market Update\n\n## Market Overview\n\nThe cryptocurrency market continues to show dynamic movements today.\n\n*Disclaimer: This is not financial advice. Always do your own research.*\n",
            "tags": ["crypto", "market", "update"],
            "seo_title": "Daily Crypto Market Update | PulseChain Analytics",
            "seo_description": "Comprehensive daily cryptocurrency market analysis.",
            "category": "MARKET_ANALYSIS",
            "reading_time": 5
        }

blog_generator = BlogGenerator()