const express = require('express');
const { CreateList, DeleteList } = require('./lilstController');
const {protect } = require('../../middleware/authMiddleware');

const listRouter = express.Router();

listRouter.post('/', protect, CreateList)
listRouter.delete('/:id', protect, DeleteList)


module.exports = listRouter;