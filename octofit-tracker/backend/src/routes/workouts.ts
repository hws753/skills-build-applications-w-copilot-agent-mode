import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().select('-__v');
  res.json({ workouts });
});

router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id).select('-__v');
  if (!workout) {
    return res.status(404).json({ message: 'Workout not found' });
  }
  res.json({ workout });
});

router.post('/', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json({ message: 'Workout plan created', workout });
});

export default router;
