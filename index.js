import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postsRoutes from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
 
app.use(bodyParser.json({ limit : "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit : "30mb", extended: true }));
app.use(cors());
const port = process.env.PORT;
app.use('/posts', postsRoutes); // Meaning every routes in posts.js can only be accessed with /posts prefix

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        app.listen(port, () => {console.log(`server running on port ${port}`)});
    })
    .catch((error) => {
        console.log(error.message);
    });



