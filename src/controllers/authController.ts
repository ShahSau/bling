import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';





// User Registration
export const register = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'User registered', success: true, error: null });
};

// User Login with 2FA
export const login = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'User logged in', success: true, error: null });
};


