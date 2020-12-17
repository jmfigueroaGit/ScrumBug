import mongoose from 'mongoose';
import slugify from 'slugify';

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title field is required'],
        },
        slug: String,
        mainCast: {
            type: String,
            required: [true, 'Main Cast field is required'],
        },
        director: {
            type: String,
            required: [true, 'Director field is required'],
        },
        poster: {
            type: String,
            required: [true, 'Poster field is required'],
            default: 'no-photo.jpg',
        },
        language: {
            type: String,
            required: [true, 'Language field is required'],
        },
        genre: {
            type: String,
            enum: [
                'Action',
                'Animation',
                'Comedy',
                'Crime',
                'Drama',
                'Experimental',
                'Fantasy',
                'Historical',
                'Horror',
                'Romance',
                'Science Fiction',
                'Thriller',
                'Western',
                'Other',
            ],
            required: [true, 'Genre field is required'],
        },
        duration: {
            type: Number,
            required: [true, 'Duration field is required'],
        },
        releasedDate: {
            type: Date,
            default: Date.now, //ayusin pa date format
        },
    },
    {
        collection: 'movies',
    }
);

movieSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
