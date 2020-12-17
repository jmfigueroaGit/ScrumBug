import asyncHandler from 'express-async-handler';
import Movie from '../models/movieModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    ADD movie
// @route   POST /api/users/admin/movie/add
// @access  Private/Admin
const addMovie = asyncHandler(async (req, res, next) => {
    const {
        title,
        mainCast,
        director,
        poster,
        language,
        genre,
        duration,
        releasedDate,
    } = req.body;

    const movieExist = await Movie.findOne({ title });

    if (movieExist) {
        return next(new ErrorResponse('Movie is already exist', 400));
    }

    const movie = await Movie.create({
        title,
        mainCast,
        director,
        poster,
        language,
        genre,
        duration,
        releasedDate,
    });

    if (movie) {
        res.status(201).json({
            //_id: movie._id,
            title: movie.title,
            mainCast: movie.mainCast,
            director: movie.director,
            poster: movie.poster,
            language: movie.language,
            genre: movie.genre,
            duration: movie.duration,
            releasedDate: movie.releasedDate,
        });
    } else {
        return next(new ErrorResponse('Invalid Data', 400));
    }
});

// @desc    UPDATE movie
// @route   PUT /api/users/admin/movie/:id
// @access  Private/Admin
const updateMovie = asyncHandler(async (req, res, next) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if (movie) {
        res.send(movie);
    } else {
        return next(new ErrorResponse('Could not find movie', 400));
    }
});

// @desc    GET all movies
// @route   GET /api/movie/list
// @access  Public
const getMovies = asyncHandler(async (req, res, next) => {
    const movie = await Movie.find({});
    res.json(movie);
});

// @desc    Delete a movie
// @route   DELETE /api/users/admin/movie/:id
// @access  Private/Admin
const deleteMovie = asyncHandler(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
        await movie.remove();
        res.json({ message: 'Movie removed' });
    } else {
        return next(new ErrorResponse('Movie not found', 400));
    }
});
export { addMovie, updateMovie, getMovies, deleteMovie };
