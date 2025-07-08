import express from "express";
import authenticator from "../middleware/authenticatorUser.js";
import { createProfile, updateProfile, deleteProfile } from "../controllers/profileController.js";
const account = express.Router();

account.post("/create",createProfile);
account.put("/update",authenticator,updateProfile);
account.delete("/delete",authenticator,deleteProfile);

export default account;