import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },  //twilio expexts mobile number to be string
  password: { type: String, required: true },
  token: { type: String },
  twoFactorCode: { type: String},
  twoFactorCodeExpiry: { type: Date},
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
