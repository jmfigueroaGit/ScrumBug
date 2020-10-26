import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/database.js';
import userRoute from './routes/userRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sample');
});

app.use('/api/users', userRoute);
app.use(notFound);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Port running at ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.underline
  )
);
