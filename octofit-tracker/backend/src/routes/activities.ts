import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().select('-__v');
  res.json({ activities });
});

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).select('-__v');
  if (!activity) {
    return res.status(404).json({ message: 'Activity not found' });
  }
  res.json({ activity });
});

router.post('/', async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json({ message: 'Activity logged', activity });
});

export default router;
