import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import cloudinary from './utils/cloudinary.js';
import cors from 'cors';

dotenv.config();

connectDB();

const __dirname = path.resolve();
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
//File uploading
app.use(fileupload());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', userRoutes);
app.use('/api/users', movieRoutes);

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
