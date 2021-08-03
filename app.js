const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

app.use(express.json());
//Import routes
const postsRoute = require('./Routes/posts');
app.use('/posts',postsRoute);

//Middlewares -> Function that executes when specific routes hit
app.use('/posts', () => {
    console.log("Middleware running");
});

//Connect to db
mongoose.connect(
process.env.DB_CONNECTION, 
{ useUnifiedTopology: true }, 
() =>
    console.log("Connected to the db")
);

app.listen(3000); 
