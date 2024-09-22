import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { generateSecret } from '../utils/secretKey';
import { generate2FToken } from '../utils/token2F';




// User Registration
export const register = async (req: Request, res: Response) => {
    const { name, email, mobile, password } = req.body;
  
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, mobile, password: hashedPassword });
      user.userId = user._id.toString();
      await user.save();
      
      res.status(201).json({ message: 'User registered successfully', success: true, error: null });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error, success: false });
    }
  };


// User Login with 2FA
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required', success: false });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found', success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password', success: false });

    // Generate and send 2FA code via SMS
    const secretKey = generateSecret();
    const twoFactorCode = generate2FToken(secretKey);
    user.twoFactorCode = twoFactorCode;
    user.twoFactorCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
    await user.save();


    res.status(200).json({ message: '2FA code sent', success: true, error: null });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error, success: false });
  }
};


