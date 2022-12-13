import express from "express";
import {googleSignIn, signin, signup} from "../controllers/user-controller.js";

const router = express.Router();

// router.get("/", getAllUser);
//sign up
router.post("/signup", signup );
//login
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);
export default router;