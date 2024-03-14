import mongoose, { Schema } from 'mongoose';

interface IUser {
  username: string; 
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true }
});

const User = mongoose.model<IUser>(
  'User',
  userSchema
);

export { IUser, User };
