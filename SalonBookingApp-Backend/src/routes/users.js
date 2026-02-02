import express from 'express';
import { getUsers} from '../controller/userController.js';
// import {verifyToken} from "../middleware/verifyToken.js"

export const userRouter = express.Router();

userRouter.get('/', getUsers);
