import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDatabase } from './config/database.js';
import mongoose from 'mongoose';
import RedisService from './config/redis.js';
import logger from './config/logger.js';
import socialRoutes from './routes/social.routes.js';
import giftsRoutes from './routes/gifts.routes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('dev')); // HTTP request logging
app.use(express.json()); // Body parsing
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'https://giftguru.ai',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours
}));

// Apply rate limiting to all requests
app.use(limiter);

// Routes
app.use('/api/social', socialRoutes);
app.use('/api/gifts', giftsRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  const redis = RedisService.getInstance();
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: {
        connected: mongoose.connection.readyState === 1
      },
      redis: {
        connected: redis.isConnected()
      }
    }
  });
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Initialize services and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();
    
    // Initialize Redis
    const redis = RedisService.getInstance();
    
    // Start server
    const PORT = process.env.PORT || 4000;
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      logger.info('Shutting down server...');
      
      server.close(async () => {
        try {
          // Disconnect from Redis
          await redis.disconnect();
          
          // Close MongoDB connection
          await mongoose.connection.close();
          
          logger.info('Server shutdown complete');
          process.exit(0);
        } catch (error) {
          logger.error('Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 