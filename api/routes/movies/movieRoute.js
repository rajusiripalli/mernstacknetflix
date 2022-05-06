const express = require('express');
const { CreateMovie, UpdateMovie, DeleteMovie, GetMovie, GetRandomMovie, GetAllMovie } = require('./movieController');
const {protect} = require('../../middleware/authMiddleware');

const movieRouter = express.Router();

movieRouter.post('/', protect, CreateMovie);
movieRouter.put('/:id', protect, UpdateMovie);
movieRouter.delete('/:id', protect, DeleteMovie);
movieRouter.get('/find/:id', protect, GetMovie);
movieRouter.get('/', protect, GetAllMovie);
movieRouter.get('/random', protect, GetRandomMovie);



module.exports = movieRouter