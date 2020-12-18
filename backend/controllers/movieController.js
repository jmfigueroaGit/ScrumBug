import asyncHandler from 'express-async-handler';
import Movie from '../models/movieModel.js';
import ErrorResponse from '../utils/errorResponse.js';
import path from 'path';
// @desc    ADD movie
// @route   POST /api/users/admin/movie/add
// @access  Private/Admin
const addMovie = asyncHandler(async (req, res, next) => {
    const {
        movieTitle,
        mainCast,
        director,
        language,
        poster,
        genre,
        duration,
        rating,
        releasedDate,
        endScreening,
        cinemaNumber,
        startTime,
        endTime,
        status,
    } = req.body;

    const movieExist = await Movie.findOne({ movieTitle });

    if (movieExist) {
        return next(new ErrorResponse('Movie is already exist', 400));
    }

    const movie = await Movie.create({
        movieTitle,
        mainCast,
        director,
        poster,
        language,
        genre,
        duration,
        rating,
        releasedDate,
        endScreening,
        cinemaNumber,
        startTime,
        endTime,
        status,
    });

    if (movie) {
        res.status(201).json({
            _id: movie._id,
            title: movie.movieTitle,
            mainCast: movie.mainCast,
            director: movie.director,
            poster: movie.poster,
            language: movie.language,
            genre: movie.genre,
            duration: movie.duration,
            rating: movie.rating,
            releasedDate: movie.releasedDate,
            endScreening: movie.endScreening,
            cinemaNumber: movie.cinemaNumber,
            startTime: movie.startTime,
            endTime: movie.endTime,
            status: movie.status,
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

// @desc Upload photo for Movies
//@route PUT /api/v1/bootcamps/:id/photo
//@access Private
const moviePosterUpload = asyncHandler(async (req, res, next) => {
    const movieTitle = req.params.id;

    const movie = await Movie.findOne({ movieTitle });

    if (movie) {
        return next(
            new ErrorResponse(
                `Movie not found with id of ${req.params.id}`,
                404
            )
        );
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a poster`, 400));
    }

    const file = req.files.file;

    console.log(file);
    //Make sure if image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    //Check File Size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse(
                `Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`,
                400
            )
        );
    }

    //Create custom filename
    file.name = `photo_${movieTitle}${path.parse(file.name).ext}`;

    console.log(file.name);
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }
        await Movie.findByIdAndUpdate(movieTitle, { poster: file.name });

        res.status(200).json({
            success: true,
        });
    });
});

// @desc Upload photo for Movies
//@route PUT /api/v1/bootcamps/:id/photo
//@access Private
const uploadPoster = asyncHandler(async (req, res, next) => {
    try {
        const fileStr = req.body.data;
        console.log(fileStr);
        // const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        //     upload_preset: 'dev_setups',
        // });
        // console.log(uploadResponse);
        // res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
const getMovieById = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
const getMovieNowShowing = asyncHandler(async (req, res) => {
    let query;

    //Copy req.query
    const reqQuery = { ...req.query };

    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    query = Movie.find(JSON.parse(queryStr));

    const movie = await query;

    res.status(200).json(movie);
});

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
const getMovieComingSoon = asyncHandler(async (req, res) => {
    let query;

    //Copy req.query
    const reqQuery = { ...req.query };

    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    query = Movie.find(JSON.parse(queryStr));

    const movie = await query;

    res.status(200).json(movie);
});

export {
    getMovieById,
    addMovie,
    updateMovie,
    getMovies,
    deleteMovie,
    uploadPoster,
    moviePosterUpload,
    getMovieNowShowing,
    getMovieComingSoon,
};
