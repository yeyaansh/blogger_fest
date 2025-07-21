import express from "express";
import authenticator from "../middleware/authenticatorUser.js";
import { createProfile, updateProfile, deleteProfile, loginProfile, logoutProfile } from "../controllers/profileController.js";
const account = express.Router();

account.post("/register",createProfile);
account.post("/login",loginProfile)
account.put("/update",authenticator,updateProfile);
account.post('/logout',authenticator,logoutProfile)
account.delete("/delete",authenticator,deleteProfile);

export default account;