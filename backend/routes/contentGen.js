import express from "express";
import authenticator from "../middleware/authenticatorUser.js";
import { viewPost, createPost, updatePost, deletePost } from "../controllers/postsController.js";
const contentGen = express.Router();

contentGen.get("/view",authenticator,viewPost);
contentGen.post("/create",authenticator,createPost);
contentGen.put("/update",authenticator,updatePost);
contentGen.delete("/delete",authenticator,deletePost);

export default contentGen;