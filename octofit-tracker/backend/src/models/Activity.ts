import mongoose from 'mongoose';

export interface ActivityDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  date: Date;
}

const activitySchema = new mongoose.Schema<ActivityDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);
export default Activity;
