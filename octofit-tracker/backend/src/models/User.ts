import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
  points: number;
  teamId?: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['athlete', 'coach', 'admin'] },
  points: { type: Number, required: true, default: 0 },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
