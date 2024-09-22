import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';


export const verifyToken = (req: Request, res: Response, next: () => void) => {
  const token = req.headers.token

    if(!token || typeof token !== 'string'){
        return res.status(401).json({message: 'Unauthorized'})
    }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  jwt.verify(token, secret, (err) => {
    
    if(err){
        return res.status(403).json({message: 'Token is invalid, expired or not provided'})
    }


    next()
  })
}
