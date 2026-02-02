import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { salonsRouter } from './src/routes/salonRoutes.js';
import { userRouter } from './src/routes/users.js';
import { loginRouter } from './src/routes/loginRoute.js';

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
}));

app.use('/salons', salonsRouter);
app.use('/users', userRouter);
app.use('/', loginRouter)


app.get("/test", (req, res) => {
  res.send("Server is running");
});

   
app.listen(process.env.PORT);