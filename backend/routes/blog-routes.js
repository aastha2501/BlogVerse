import express from "express";
import auth from "../middleware/auth.js";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  getBlogBySearch,
  getBlogByTag,
  getBlogsByUser,
  updateBlog,
} from "../controllers/blog-controller.js";

const router = express.Router();
router.get("/search", getBlogBySearch);
router.get("/tag/:tag", getBlogByTag);
router.post("/", auth, addBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.delete("/:id", auth, deleteBlog);
router.patch("/:id", auth, updateBlog);
router.get("/userBlogs/:id", auth, getBlogsByUser);

export default router;
