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


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: register a new user
 *     description: register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user.
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               mobile:
 *                 type: string
 *                 description: Mobile number of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Error registering user.
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login a user
 *     description: login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       200:
 *         description: 2FA code sent.
 *       400:
 *         description: Invalid password.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error during login.
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/verify-2fa:
 *   post:
 *     summary: verify 2FA and generate JWT
 *     description: verify 2FA and generate JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               code:
 *                 type: string
 *                 description: 2FA code sent to the user via SMS.
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Invalid or expired 2FA code.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error verifying 2FA.
 */
router.post('/verify-2fa', verify2FA);

/**
 * @swagger
 * /api/auth/update-user/{userId}:
 *   put:
 *     summary: update user details
 *     description: update user details
 *     parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *         type: string
 *      - in: path
 *        name: userId 
 *        required: true
 *        schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user.
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: All fields are required.
 *       500:
 *         description: Error updating user.
 */
router.put('/update-user/:userId',verifyToken ,updateUser);

/**
 * @swagger
 * /api/auth/change-password/{userId}:
 *   post:
 *     summary: change user password
 *     description: change user password
 *     parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *         type: string
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *        type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Current password of the user.
 *     responses:
 *       200:
 *         description: 2FA code sent for password change.
 *       400:
 *         description: Invalid current password.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error during password change.
 */
router.post('/change-password/:userId', verifyToken,changePassword);

/**
 * @swagger
 * /api/auth/verify-password-change/{userId}:
 *   post:
 *     summary: verify password change
 *     description: verify password change
 *     parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *         type: string
 *      - in: path
 *        name: userId 
 *        required: true
 *        schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - newPassword
 *             properties:
 *               code:
 *                 type: string
 *                 description: 2FA code sent to the user via SMS.
 *               newPassword:
 *                 type: string
 *                 description: New password of the user.
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Invalid or expired 2FA code.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error changing password.
 */
router.post('/verify-password-change/:userId', verifyToken,verifyPasswordChange);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: forgot password
 *     description: forgot password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - mobile
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               mobile:
 *                 type: string
 *                 description: Mobile number of the user.
 *     responses:
 *       200:
 *         description: Password reset link sent to email.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error during password reset.
 */
router.post('/forgot-password',forgotPassword);

/**
 * @swagger
 * /api/auth/verify-password-change-forgot-pass:
 *   post:
 *     summary: verify password change
 *     description: verify password change
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - newPassword
 *               - email
 *             properties:
 *               code:
 *                 type: string
 *                 description: 2FA code sent to the user via SMS.
 *               newPassword:
 *                 type: string
 *                 description: New password of the user.
 *               email:
 *                type: string
 *                description: Email of the user.
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Invalid or expired 2FA code.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error changing password.
 */
router.post('/verify-password-change-forgot-pass', verifyPasswordChangeForgotPass);


export default router;
