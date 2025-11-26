const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());
const connectToDb = require('./db/db.js');
connectToDb();
const userRoutes = require('./routes/user.routes.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/users', userRoutes);

module.exports = app;