import { Schema, model, Document } from 'mongoose';

export interface ISession extends Document {
    user: Schema.Types.ObjectId;
    userAgent: string;
    ip: string;
    lastActive: Date;
    isVerified: boolean;
}

const sessionSchema = new Schema<ISession>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userAgent: { type: String },
    ip: { type: String },
    lastActive: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: true }
}, { timestamps: true });

export default model<ISession>('Session', sessionSchema);