import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().select('-__v');
  res.json({ users });
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-__v');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user });
});

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: 'User created', user });
});

export default router;
