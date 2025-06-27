// Jest setup file for API testing
process.env.NODE_ENV = 'test'
process.env.API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'
process.env.MAX_RECOMMENDATIONS = process.env.MAX_RECOMMENDATIONS || '10' 