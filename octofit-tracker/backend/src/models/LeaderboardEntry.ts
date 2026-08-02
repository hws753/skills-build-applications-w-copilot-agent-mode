import mongoose from 'mongoose';

export interface LeaderboardEntryDocument extends mongoose.Document {
  rank: number;
  subjectType: 'user' | 'team';
  subjectId: mongoose.Types.ObjectId;
  subjectName: string;
  points: number;
}

const leaderboardEntrySchema = new mongoose.Schema<LeaderboardEntryDocument>({
  rank: { type: Number, required: true },
  subjectType: { type: String, required: true, enum: ['user', 'team'] },
  subjectId: { type: mongoose.Schema.Types.ObjectId, required: true },
  subjectName: { type: String, required: true },
  points: { type: Number, required: true }
});

const LeaderboardEntry = mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);
export default LeaderboardEntry;
