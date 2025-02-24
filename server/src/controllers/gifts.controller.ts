import { Request, Response } from 'express';
import { z } from 'zod';
import geminiService from '../services/gemini.service';
import RedisService from '../config/redis';
import logger from '../config/logger';

// Input validation schema
const suggestionsRequestSchema = z.object({
  sessionId: z.string().min(1),
  ageGroup: z.string().min(1),
  interests: z.array(z.string()).min(1),
  budget: z.number().positive(),
  force: z.boolean().optional().default(false)
});

export class GiftsController {
  private redis = RedisService.getInstance();

  /**
   * Get gift suggestions based on interests and budget
   */
  public getSuggestions = async (req: Request, res: Response) => {
    try {
      // Validate input
      const { sessionId, ageGroup, interests, budget, force } = suggestionsRequestSchema.parse(req.body);

      // Check cache if force is false
      if (!force) {
        const cachedData = await this.redis.getGiftSuggestions(sessionId, ageGroup, interests, budget);
        if (cachedData) {
          logger.info(`Returning cached gift suggestions for session ${sessionId}`);
          return res.json({
            success: true,
            data: cachedData,
            source: 'cache'
          });
        }
      }

      // Get suggestions from Gemini
      const suggestions = await geminiService.getSuggestions(ageGroup, interests, budget);

      // Cache the results
      await this.redis.cacheGiftSuggestions(
        sessionId,
        ageGroup,
        interests,
        budget,
        suggestions,
        parseInt(process.env.SCRAPER_CACHE_TTL || '3600')
      );

      return res.json({
        success: true,
        data: suggestions,
        source: 'fresh'
      });
    } catch (error) {
      logger.error('Error getting gift suggestions:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Invalid request data',
          details: error.errors
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Failed to get gift suggestions'
      });
    }
  };

  /**
   * Clear cached suggestions for a session
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

      const clearedCount = await this.redis.deleteGiftSuggestions(sessionId);

      return res.json({
        success: true,
        message: `Cleared ${clearedCount} cached suggestions`
      });
    } catch (error) {
      logger.error('Error clearing suggestions cache:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to clear cache'
      });
    }
  };
}

export default new GiftsController(); 