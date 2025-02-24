import { Request, Response } from 'express';
import { z } from 'zod';
import socialMediaScraper from '../services/scraper.service';
import RedisService from '../config/redis';
import logger from '../config/logger';

// Input validation schema
const scrapeRequestSchema = z.object({
  sessionId: z.string().min(1),
  instagramUserId: z.string().min(1),
  force: z.boolean().optional().default(false)
});

export class SocialController {
  private redis = RedisService.getInstance();

  /**
   * Trigger social media scraping for a session
   */
  public scrape = async (req: Request, res: Response) => {
    try {
      // Validate input
      const { sessionId, instagramUserId, force } = scrapeRequestSchema.parse(req.body);

      // Check cache if force is false
      if (!force) {
        const cachedData = await this.redis.getSocialData(sessionId);
        if (cachedData) {
          logger.info(`Returning cached social data for session ${sessionId}`);
          return res.json({
            success: true,
            data: cachedData,
            source: 'cache'
          });
        }
      }

      // Trigger scraping
      await socialMediaScraper.scrapeAndAnalyze(sessionId, instagramUserId);

      // Get the fresh data
      const data = await this.redis.getSocialData(sessionId);

      return res.json({
        success: true,
        data,
        source: 'fresh'
      });
    } catch (error) {
      logger.error('Error in social media scraping:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Invalid request data',
          details: error.errors
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Failed to scrape social media data'
      });
    }
  };

  /**
   * Get cached social data for a session
   */
  public getCachedData = async (req: Request, res: Response) => {
    try {
      const sessionId = req.params.sessionId;
      if (!sessionId) {
        return res.status(400).json({
          success: false,
          error: 'Session ID is required'
        });
      }

      const data = await this.redis.getSocialData(sessionId);
      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'No cached data found for this session'
        });
      }

      return res.json({
        success: true,
        data
      });
    } catch (error) {
      logger.error('Error fetching cached social data:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch cached social data'
      });
    }
  };

  /**
   * Clear cached social data for a session
   */
  public clearCache = async (req: Request, res: Response) => {
    try {
      const sessionId = req.params.sessionId;
      if (!sessionId) {
        return res.status(400).json({
          success: false,
          error: 'Session ID is required'
        });
      }

      await this.redis.deleteSocialData(sessionId);

      return res.json({
        success: true,
        message: 'Cache cleared successfully'
      });
    } catch (error) {
      logger.error('Error clearing social data cache:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to clear cache'
      });
    }
  };
}

export default new SocialController(); 