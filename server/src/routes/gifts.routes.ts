import { Router } from 'express';
import giftsController from '../controllers/gifts.controller';

const router = Router();

/**
 * @route   POST /api/gifts/suggest
 * @desc    Get gift suggestions based on interests and budget
 * @access  Private
 * @body    { sessionId: string, ageGroup: string, interests: string[], budget: number, force?: boolean }
 */
router.post('/suggest', giftsController.getSuggestions);

/**
 * @route   DELETE /api/gifts/cache/:sessionId
 * @desc    Clear cached suggestions for a session
 * @access  Private
 */
router.delete('/cache/:sessionId', giftsController.clearCache);

export default router; 