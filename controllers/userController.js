import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";

export const signin = async(req, res) => {
    try {
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message: 'user does not exist'}); 
        }
        const isPwdCorrect = bcrypt.compare(password, existingUser.password);
        if(!isPwdCorrect) return res.status(400).json({message: 'incorrect password'});
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'testSecret', {expiresIn: '1h'});
        res.status(200).json({result: existingUser, token});

    } catch (error) {
        res.status(500).json({ message: error});
    }
}

export const signup = async(req, res) => {
    try {
        const {firstName,lastName,email,password,confirmPassword} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(404).json({message: 'user already exist'}); 
        }
        if(password !== confirmPassword){
            return res.status(404).json({message: 'passwords do not match'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({email: newUser.email, id: newUser._id}, 'testSecret', {expiresIn: '1h'});
        res.status(200).json({result: newUser, token});

    } catch (error) {
        res.status(500).json({ message: error});
    }
}