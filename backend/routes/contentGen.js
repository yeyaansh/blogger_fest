import express from "express";
import authenticator from "../middleware/authenticatorUser.js";
import { viewPost, createPost, updatePost, deletePost, likePost, commentPost,viewAllPost } from "../controllers/postsController.js";
const contentGen = express.Router();


contentGen.get("/view-all/post",authenticator,viewAllPost);
contentGen.get("/view/post/:id",authenticator,viewPost);
contentGen.post("/create/post",authenticator,createPost);
contentGen.put("/update/post/:id",authenticator,updatePost);
contentGen.delete("/delete/post/:id",authenticator,deletePost);

// actions performed by users on blogs
contentGen.post("/actions/like/:id",authenticator,likePost);
contentGen.post("/actions/comment/:id",authenticator,commentPost);

export default contentGen;