import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({ subjectType: 'user' }).sort({ rank: 1 }).select('-__v');
  res.json({ leaderboard });
});

router.get('/teams', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({ subjectType: 'team' }).sort({ rank: 1 }).select('-__v');
  res.json({ leaderboard });
});

export default router;
