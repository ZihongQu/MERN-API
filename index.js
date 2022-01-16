import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postsRoutes from './routes/posts.js';

const app = express()
app.use(bodyParser.json({ limit : "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit : "30mb", extended: true }));
app.use(cors());
const port = 5000
const URL ='mongodb+srv://zihong:wsAD1998@cluster0.r0hgz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.use('/posts', postsRoutes); // Meaning every routes in posts.js can only be accessed with /posts prefix

mongoose.connect(URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        app.listen(port, () => {console.log(`server running on port ${port}`)});
    })
    .catch((error) => {
        console.log(error.message);
    });



