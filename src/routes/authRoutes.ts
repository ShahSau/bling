import express from 'express';
import {
    register,
    login,
    verify2FA,
    updateUser,
    changePassword,
    verifyPasswordChange,
    forgotPassword,
    verifyPasswordChangeForgotPass
} from '../controllers/authController';

import { verifyToken } from '../middlewares/verifyUser';



const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.post('/verify-2fa', verify2FA);

router.put('/update-user/:userId',verifyToken ,updateUser);

router.post('/change-password/:userId', verifyToken,changePassword);

router.post('/verify-password-change/:userId', verifyToken,verifyPasswordChange);

router.post('/forgot-password',forgotPassword);

router.post('/verify-password-change-forgot-pass', verifyPasswordChangeForgotPass);



export default router;
