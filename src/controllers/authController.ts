import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateSecret } from '../utils/secretKey';
import { generate2FToken } from '../utils/token2F';



const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};


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

// Verify 2FA and generate JWT
export const verify2FA = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: 'Email and 2FA code are required', success: false });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found', success: false });

    if (user.twoFactorCode !== code || new Date() > (user.twoFactorCodeExpiry!)) {
      return res.status(400).json({ message: 'Invalid or expired 2FA code', success: false });
    }

    const token = generateToken(user._id.toString());
    user.token = token;
    user.twoFactorCode = '';
    await user.save();
    res.status(200).json({ message: 'Login successful', data:{
        user: {
            name: user.name,
            email: user.email,
            token: user.token,
            mobile: user.mobile,
            userId: user.userId
        }
    }, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying 2FA', error, success: false });
  }
};

// Update user details (name, email)
export const updateUser = async (req: Request, res: Response) => {
  
  const { name, email } = req.body;

  const userId = req.params.userId;

  if (!name && !email) {
    return res.status(400).json({ message: 'Name or email is required', success: false });
  }

  try {
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: 'User not found', success: false });
    const updatedUser = await User.findOneAndUpdate({
      userId: userId
    }, {
      name: name || user.name,
      email: email || user.email
    }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found', success: false });

    res.status(200).json({ message: 'User updated successfully', data: {
        user: {
            name: updatedUser?.name,
            email: updatedUser?.email,
            mobile: updatedUser?.mobile
        }
    }, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error, success: false });
  }
};

// Change Password with SMS verification
export const changePassword = async (req: Request, res: Response) => {
  const { currentPassword } = req.body;
  const userId = req.params.userId;

  if (!currentPassword ) {
    return res.status(400).json({ message: 'Current password is required', success: false });
  }

  try {
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: 'User not found', success: false });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid current password', success: false });

    // Send 2FA code for password change verification
    const secretKey = generateSecret();
    const twoFactorCode = generate2FToken(secretKey);
    user.twoFactorCode = twoFactorCode;
    user.twoFactorCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
    await user.save();


    res.status(200).json({ message: '2FA code sent for password change', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error during password change', error, success: false });
  }
};

// Verify password change and update password
export const verifyPasswordChange = async (req: Request, res: Response) => {
  const { code, newPassword } = req.body;

  const userId = req.params.userId;

  try {
    const user = await User.findOne({ userId});
    if (!user) return res.status(404).json({ message: 'User not found', success: false });

    if (user.twoFactorCode !== code || new Date() > (user.twoFactorCodeExpiry!)) {
      return res.status(400).json({ message: 'Invalid or expired 2FA code', success: false });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error, success: false });
  }
};

// forgot password with SMS verification
export const forgotPassword = async (req: Request, res: Response) => {
  const { email,mobile } = req.body;

  if (!email || !mobile) {
    return res.status(400).json({ message: 'Email or mobile is required', success: false });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found', success: false });

    // Send 2FA code for password change verification
    const secretKey = generateSecret();
    const twoFactorCode = generate2FToken(secretKey);
    user.twoFactorCode = twoFactorCode;
    user.twoFactorCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
    await user.save();


    res.status(200).json({ message: '2FA code sent for password change', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error during password change', error, success: false });
  }
}

// Verify password change and update password for forgot password
export const verifyPasswordChangeForgotPass = async (req: Request, res: Response) => {
  const { code, newPassword,email } = req.body;


  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found', success: false });

    if (user.twoFactorCode !== code || new Date() > (user.twoFactorCodeExpiry!)) {
      return res.status(400).json({ message: 'Invalid or expired 2FA code', success: false });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error, success: false });
  }
};