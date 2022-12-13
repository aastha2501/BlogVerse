import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

app.use("/users", userRouter); //http://localhost:5000/users/signup
app.use("/blog", blogRouter);

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL)
.then(() => app.listen(port)).then(() => console.log("connected to db")).catch((err) => console.log(err)); 



// pwd:ey1sAvsX0kT8We3l