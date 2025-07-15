import express from "express";
import authenticator from "../middleware/authenticatorUser.js";
import { viewPost, createPost, updatePost, deletePost, likePost, commentPost,viewAllPost, aiGenerationPost } from "../controllers/postsController.js";
const contentGen = express.Router();


contentGen.get("/view-all/post",viewAllPost); // removed 'authenticator' to allow everyone to view all the posts
contentGen.get("/view/post/:id",viewPost); // removed 'authenticator' to allow everyone to view the post by id
contentGen.post("/create/post",authenticator,createPost);
contentGen.put("/update/post/:id",authenticator,updatePost);
contentGen.delete("/delete/post/:id",authenticator,deletePost);

// ai generated operations
contentGen.post("/ai/generate/post",authenticator,aiGenerationPost)

// actions performed by users on blogs
contentGen.post("/actions/like/:id",authenticator,likePost);
contentGen.post("/actions/comment/:id",authenticator,commentPost);

export default contentGen;