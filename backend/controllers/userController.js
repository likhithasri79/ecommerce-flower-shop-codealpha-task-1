const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '30d'});
};

exports.registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: 'User already exists'});
        }
        const user = await User.create({name, email, password});
        if(user){
            res.status(201).json({
                _id : user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
        else{
            res.status(500).json({message: "Invalid username or password"});
        }
    }
    catch(error){
        console.error('Error during user registration:', error); 
        res.status(500).json({message: error.message});
    }
};

exports.authUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
        console.log(req.body);
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
        else{
            console.log(req.body);
            res.status(401).json({message: 'Invalid username or password'+req.body});
        }
    }
    catch(error){
        res.status(500).json({message: error.message+req.body});
    }
};

exports.getUserProfile = async(req,res)=>{
    const user = await User.findOne(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else{
        res.status(404).json({message: 'User not found'});
    }
};
