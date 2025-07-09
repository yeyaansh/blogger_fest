import express from "express";
import authenticator from "../middleware/authenticatorUser.js";
import { createProfile, updateProfile, deleteProfile, loginProfile } from "../controllers/profileController.js";
const account = express.Router();

account.post("/create",createProfile);
account.post("/login",loginProfile)
account.put("/update",authenticator,updateProfile);
account.delete("/delete",authenticator,deleteProfile);

export default account;