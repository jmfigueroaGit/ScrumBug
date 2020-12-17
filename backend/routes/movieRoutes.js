import express from 'express';
import {
    addMovie,
    updateMovie,
    getMovies,
    deleteMovie,
} from '../controllers/movieController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express();

//from Movie Controller
router.route('/movie/list').get(getMovies);
router.route('/admin/movie/add').post(protect, admin, addMovie);
router
    .route('/admin/movie/:id')
    .put(protect, admin, updateMovie)
    .delete(protect, admin, deleteMovie);

export default router;
