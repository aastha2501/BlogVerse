import Blog from "../model/Blog.js";
import mongoose from "mongoose";

export const addBlog = async(req, res) => {
    const blog = req.body;

    const newBlog = new Blog({
        ...blog,
        creator: req.userId,
        createdAt: new Date().toISOString()
     }); 

    try {
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch(err) {
        res.status(404).json({message: "Something went wrong"});
    }
};

export const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find();  //return all the blogs that we have in our mongodb
        res.status(200).json(blogs);
    } catch(err) {
        res.status(404).json({message: "Something went wrong"});
    }
};

export const getBlog = async(req, res) => {
    const {id} = req.params;
    try {
        const blog = await Blog.findById(id);  //return all the blogs that we have in our mongodb
        res.status(200).json(blog);
    } catch(err) {
        res.status(404).json({message: "Something went wrong"});
    }
};

export const getBlogsByUser = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "User doesn't exist!"})
    }
    const userBlogs = await Blog.find({creator: id}); //get all the blogs created by the user
    res.status(200).json(userBlogs);
}

//to delete a blog
export const deleteBlog = async(req, res) => {
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "Blog doesn't exist!"})
        }
        await Blog.findByIdAndRemove(id);
    
        res.json({message: "Blog Deleted Successfully!!"});
    } catch(err) {
        res.status(404).json({message: "Something went wrong"});
    }
};

//updating the existing blog
export const updateBlog = async(req, res) => {
    const {id} = req.params;
    const {title, description, creator, imageFile, tags} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "Blog doesn't exist!"})
        }
        const updatedBlog = {
            creator,
            title,
            description,
            tags,
            imageFile,
            _id: id
        }
        await Blog.findByIdAndUpdate(id, updatedBlog, {new: true});
    
        res.json(updatedBlog);
    } catch(err) {
        res.status(404).json({message: "Something went wrong"});
    }
};

export const getBlogBySearch = async(req, res) => {
    const {searchQuery} = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const blogs = await Blog.find({title});
        res.json(blogs);
    } catch(err) {
        res.status(404).json({message: "Something went wrong"});
    }
}

// get blogs by tags
export const getBlogByTag= async(req, res) => {
    const {tag} = req.params;
    try {
        const blogs = await Blog.find({tags: {$in: tag}});
        res.json(blogs);
    } catch(err) {
        res.status(404).json({message: "Something went wrong"});
    }
}