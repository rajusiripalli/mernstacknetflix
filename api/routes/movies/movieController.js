const asyncHandler = require('express-async-handler');
const { findById } = require('../../models/Movie');
const Movie = require('../../models/Movie');
const { move } = require('./movieRoute');

//@desc Create Movie
//@route POST /api/movie
//@acces Private
const CreateMovie = asyncHandler( async (req, res) => {
        if(req.user.isAdmin){
            const newMovie = new Movie(req.body);
            try {
                const savedMovie = await newMovie.save();
                res.status(201).json(savedMovie);
            } catch (error) {
                res.status(500)
                throw new Error(error);
            }
        }else{
            res.status(403)
            throw new Error('Your not allowed !');
        }
    
})


//@desc Update Movie
//@route POST /api/movie/:id
//@acces Private
const UpdateMovie = asyncHandler( async (req, res) => {
    if(req.user.isAdmin){
        try {
            const updateMovie = new Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})
            res.status(200).json(updateMovie);
        } catch (error) {
            res.status(500)
            throw new Error(error);
        }
    }else{
        res.status(403)
        throw new Error('Your not allowed !');
    }

})


//@desc Delete Movie
//@route POST /api/movie/:id
//@acces Private
const DeleteMovie = asyncHandler( async (req, res) => {
    if(req.user.isAdmin){
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json('The movie has been deleted...');
        } catch (error) {
            res.status(500)
            throw new Error(error);
        }
    }else{
        res.status(403)
        throw new Error('Your not allowed !');
    }

})


//@desc Find Movie
//@route GET /api/movie/:id
//@acces Private
const GetMovie = asyncHandler( async (req, res) => {
    if(req.user.isAdmin){
        try {
            const movie = await Movie.findById(req.params.id);
            res.status(200).json(movie);
        } catch (error) {
            res.status(500)
            throw new Error(error);
        }
    }else{
        res.status(403)
        throw new Error('Your not allowed !');
    }

})

//@desc Get Random Movie
//@route POST /api/movie/random
//@acces Private
const GetRandomMovie = asyncHandler( async (req, res) => {
    const type = req.query.type;
    let movie

    try {
        if(type === 'series'){
            movie = await Movie.aggregate([
                {$match : {isSeries: true}},
                {$sample: {size: 1}}
            ])
        }else{
            movie = await Movie.aggregate([
                {$match : {isSeries: false}},
                {$sample: {size: 1}}
            ])
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(403)
        throw new Error(error)
    }

})



module.exports = {
    CreateMovie,
    UpdateMovie,
    DeleteMovie,
    GetMovie, 
    GetRandomMovie
    
}