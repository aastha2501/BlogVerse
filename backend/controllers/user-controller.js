import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "test";

//get all users from the db

// export const getAllUser = async(req, res, next) => {
//     let users;
//     try {
//         users = await User.find();
//     } catch(err) {
//         console.log(err);
//     }
//     if(!users) {
//         return res.this.status(404).json({message: "No users found"});
//     }
//     return res.status(200).json({users});
// };

export const signup = async(req, res) => {
    const {email, password, firstName, lastName} = req.body;
    
    let existingUser;
    try {
        //filter with email 
        existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "User already exists!!"})
        }

        const hashedPassword = await bcrypt.hash(password,12);
        //not found then create new user
        const user = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        });

        //create a token
        const token = jwt.sign({email: user.email, id: user._id}, secret, {expiresIn: "1h"})
        return res.status(201).json({user, token});

    } catch(err) {
        res.status(500).json({message: "Something wents wrong!!"});
        console.log(err);
    }
};

export const signin = async(req, res) => {
    const {email, password} = req.body;
    let existingUser;
    try {
        //filter with email 
        existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(404).json({message: "User not found!!"});
        } 

        //if user is found compare the pwd
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({message: "Incorrect credentials"});
    }

    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, secret, {expiresIn: "1h"})
    return res.status(200).json({user: existingUser, token});

    } catch(err) {
        res.status(500).json({message: "Something wents wrong!!"});
        console.log(err);
    }   
}

export const googleSignIn = async(req,res) => {
    const {email, name, token, googleId} = req.body;
    try {
        const oldUser = await User.findOne({email});
        if(oldUser){
            const result = {_id: oldUser._id.toString(), email, name};
            return res.status(200).json({result, token});
        }

        const result = await User.create({
            email,
            name,
            googleId
        });

        res.status(200).json({result, token});
    } catch(err) {
        res.status(500).json({message: "Something wents wrong!!"});
        console.log(err);
    }
}