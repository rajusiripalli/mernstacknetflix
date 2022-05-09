const express = require('express');
const { CreateList, DeleteList, GetMovies } = require('./listController');
const {protect } = require('../../middleware/authMiddleware');

const listRouter = express.Router();

listRouter.post('/', protect, CreateList)
listRouter.delete('/:id', protect, DeleteList)
listRouter.get('/', protect, GetMovies)


module.exports = listRouter;