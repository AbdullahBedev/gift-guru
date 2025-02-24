import { Router } from 'express';
import socialController from '../controllers/social.controller';

const router = Router();

/**
 * @route   POST /api/social/scrape
 * @desc    Scrape social media data for a session
 * @access  Private
 * @body    { sessionId: string, instagramUserId: string, force?: boolean }
 */
router.post('/scrape', socialController.scrape);

/**
 * @route   GET /api/social/cache/:sessionId
 * @desc    Get cached social media data for a session
 * @access  Private
 */
router.get('/cache/:sessionId', socialController.getCachedData);

/**
 * @route   DELETE /api/social/cache/:sessionId
 * @desc    Clear cached social media data for a session
 * @access  Private
 */
router.delete('/cache/:sessionId', socialController.clearCache);

export default router; 