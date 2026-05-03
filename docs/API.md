# PulseChain Analytics API

## Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh

## Coins
GET /api/coins
GET /api/coins/[id]
GET /api/coins/search?q=bitcoin

## Predictions
GET /api/predictions/[coinId]
GET /api/predictions/[coinId]/sentiment

## Alerts
GET /api/alerts
POST /api/alerts
DELETE /api/alerts/[id]

## Portfolio
GET /api/portfolio
POST /api/portfolio
POST /api/portfolio/sync

## Affiliate
GET /api/affiliate/link
GET /api/affiliate/earnings
POST /api/affiliate/payout

## Blog
GET /api/blog
POST /api/blog/generate
POST /api/blog/publish

## MCP
POST /api/mcp