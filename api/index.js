const express = require('express');
const cors = require('cors');
const mongoose  = require('mongoose');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const userauthRouter = require('./routes/userAuth/userAuthRoute');
const userRouter = require('./routes/users/userRoute');

const app = express();

const PORT  =  process.env.PORT || 5000

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

app.use('/api', userauthRouter);
app.use('/api/user', userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
