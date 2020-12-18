import express from 'express';
import {
    addMovie,
    updateMovie,
    getMovies,
    deleteMovie,
    moviePosterUpload,
    uploadPoster,
    getMovieById,
    getMovieNowShowing,
    getMovieComingSoon
} from '../controllers/movieController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express();

//from Movie Controller
router.route('/movie/list').get(getMovies);
router.route('/movie/filter').get(getMovieNowShowing);
router.route('/movie/coming').get(getMovieComingSoon);
router.route('/admin/movie/add').post(addMovie);
router.route('/admin/movie/upload').post(uploadPoster);
router.route('/admin/movie/poster/:id').put(moviePosterUpload);
router
    .route('/admin/movie/:id')
    .get(getMovieById)
    .put(protect, admin, updateMovie)
    .delete(protect, admin, deleteMovie);

export default router;
