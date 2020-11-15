import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    phone: { type: String },
    name: String,
    ranking: String,
    rankingStats: Number,
    photoUrl: String,
}, {timestamps: true, collection: 'Players'})