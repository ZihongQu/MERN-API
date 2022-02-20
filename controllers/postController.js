import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose'

export const getPosts = async(req, res) => {
    const {page} = req.query;
    try{
        const limit = 6
        const startIndex = (Number(page) -1) * limit;
        const totalPostCount = await PostMessage.countDocuments({}); // Get the total number of posts
        // sort the post from newest to oldest, limit the number of returns and skip posts on previous pages
        const posts = await PostMessage.find().sort({_id: -1}).limit(limit).skip(startIndex);
        
        res.status(200).json({data: posts, currentPage: Number(page), totalPageCount: Math.ceil(totalPostCount/limit)});
    }
    catch (error){
        res.status(404).json({message: error});
    }
}

export const getPostsBySearch = async(req, res) => {
    const {searchQuery, tags} = req.query
    try {
        const searchTerm = new RegExp(searchQuery, 'i'); //i stands for ignore case
        const result = await PostMessage.find({ $or : [{ title: searchTerm}, {message: searchTerm}, { tags: {$in : tags.split(',')}}]});
        res.json(result);
    } catch (error) {
        res.status(404).json( {message: error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creatorId: req.userId, createdAt: new Date().toISOString()});

    try{
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({ message: error});
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(_id);
    res.json({message: 'successfully deleted'});
}

export const likePost = async (req, res) => {
    const {id} = req.params;
    if(!req.userId) return res.json('unauthenticated user');

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    if(index === -1){
        // like a post
        post.likes.push(String(req.userId));
    }
    else{
        //dislike a post
        post.likes = post.likes.filter((id) => 
            id !== String(req.userId)
        );
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new : true});
    res.json(updatedPost);
}

export const getPostById = async (req, res) => {
    const {id} = req.params;
    try {
        const singlePost = await PostMessage.findById(id);
        res.status(200).json(singlePost);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

export const addComment = async (req, res) => {
    const {comment}= req.body;
    const{id} = req.params;
    try {
        const postToUpdate = await PostMessage.findById(id);
        postToUpdate.comments.push(comment);
    
        const updated = await PostMessage.findByIdAndUpdate(id, postToUpdate, {new: true});
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({message: error});
    }
}