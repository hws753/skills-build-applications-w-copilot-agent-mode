import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().select('-__v');
  res.json({ teams });
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).select('-__v');
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }
  res.json({ team });
});

router.post('/', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json({ message: 'Team created', team });
});

export default router;
