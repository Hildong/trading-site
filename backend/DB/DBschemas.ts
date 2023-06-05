import mongoose, { ObjectId, Schema, Types } from 'mongoose';

interface ITrades {
    userID: ObjectId,
    base: String,
    quote: String,
    action: String,
    price: Number,
    volume: Number
}

export interface IUser {
    name: String,
    portfolio: {
        fiat: Number,
        btc: Number,
        eth: Number
    },
    trades: [ITrades] | null
}

const userSchema = new Schema<IUser>({
    name: String,
    portfolio: {
        fiat: Number,
        btc: Number,
        eth: Number
    },
    trades: Array<ITrades>
})

export const userModel = mongoose.model<IUser>('User', userSchema);
