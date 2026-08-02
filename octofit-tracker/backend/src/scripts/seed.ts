import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import LeaderboardEntry from '../models/LeaderboardEntry';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({})
    ]);

    const users = await User.create([
      { name: 'Avery Lane', email: 'avery@octofit.com', role: 'athlete', points: 1840 },
      { name: 'Jordan Cruz', email: 'jordan@octofit.com', role: 'athlete', points: 1710 },
      { name: 'Samira Patel', email: 'samira@octofit.com', role: 'coach', points: 1240 }
    ]);

    const teams = await Team.create([
      {
        name: 'Octofit Rangers',
        description: 'A high-energy team focused on strength and conditioning.',
        memberIds: [users[0]._id, users[1]._id],
        points: 3550
      },
      {
        name: 'Pulse Crew',
        description: 'A community for endurance athletes and recovery routines.',
        memberIds: [users[2]._id],
        points: 1240
      }
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        type: 'running',
        durationMinutes: 34,
        calories: 280,
        date: new Date('2026-08-01T07:30:00.000Z')
      },
      {
        userId: users[0]._id,
        type: 'strength training',
        durationMinutes: 55,
        calories: 420,
        date: new Date('2026-08-01T18:00:00.000Z')
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        durationMinutes: 48,
        calories: 460,
        date: new Date('2026-08-02T06:15:00.000Z')
      }
    ]);

    await Workout.create([
      {
        name: 'Morning HIIT',
        durationMinutes: 25,
        difficulty: 'medium',
        muscleGroups: ['full body', 'core'],
        description: 'A fast-paced circuit to start the day with cardio and strength.'
      },
      {
        name: 'Recovery Flow',
        durationMinutes: 20,
        difficulty: 'easy',
        muscleGroups: ['mobility', 'stretching'],
        description: 'A gentle movement session to help the body recover after intense training.'
      },
      {
        name: 'Endurance Builder',
        durationMinutes: 45,
        difficulty: 'hard',
        muscleGroups: ['legs', 'core'],
        description: 'A steady-state workout for improving stamina and aerobic capacity.'
      }
    ]);

    await LeaderboardEntry.create([
      { rank: 1, subjectType: 'user', subjectId: users[0]._id, subjectName: 'Avery Lane', points: 1840 },
      { rank: 2, subjectType: 'user', subjectId: users[1]._id, subjectName: 'Jordan Cruz', points: 1710 },
      { rank: 3, subjectType: 'user', subjectId: users[2]._id, subjectName: 'Samira Patel', points: 1240 },
      { rank: 1, subjectType: 'team', subjectId: teams[0]._id, subjectName: 'Octofit Rangers', points: 3550 },
      { rank: 2, subjectType: 'team', subjectId: teams[1]._id, subjectName: 'Pulse Crew', points: 1240 }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
