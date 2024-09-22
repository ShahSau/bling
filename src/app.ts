import express,{ Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import swaggerUI from 'swagger-ui-express';
import specs  from './swagger';


dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080']; // front-end URL should be added here
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));




//Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/api/auth', authRoutes);



//health check
app.get('/api/health', (_req:Request, res:Response) => {
    res.send('I am live');
});


mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

export default app;
