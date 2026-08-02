import mongoose from 'mongoose';

export interface WorkoutDocument extends mongoose.Document {
  name: string;
  durationMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  muscleGroups: string[];
  description: string;
}

const workoutSchema = new mongoose.Schema<WorkoutDocument>({
  name: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
  muscleGroups: [{ type: String, required: true }],
  description: { type: String, required: true }
});

const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);
export default Workout;
