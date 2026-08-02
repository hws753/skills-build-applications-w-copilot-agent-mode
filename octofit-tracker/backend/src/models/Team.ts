import mongoose from 'mongoose';

export interface TeamDocument extends mongoose.Document {
  name: string;
  description: string;
  memberIds: mongoose.Types.ObjectId[];
  points: number;
}

const teamSchema = new mongoose.Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  points: { type: Number, required: true, default: 0 }
});

const Team = mongoose.model<TeamDocument>('Team', teamSchema);
export default Team;
