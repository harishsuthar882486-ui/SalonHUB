import express from 'express';
import { loginUser, registerUser } from '../controller/loginController.js';
import { registerSalon } from '../controller/salAdmRegController.js';


export const loginRouter = express.Router();

loginRouter.post('/login', loginUser);
loginRouter.post('/user-reg', registerUser);
loginRouter.post('/salon-reg', registerSalon)
