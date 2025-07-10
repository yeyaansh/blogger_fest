import bcrypt from "bcrypt";
import { client } from "../connection_establishment.js";
import verifyInputDetails from "../utils/verifyInputDetails.js";
import User from "../database/schemas/user_schema.js";
import genCookie from "../utils/generate_cookie.js";

const createProfile = async (req, res) => {
  try {
    verifyInputDetails(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);

    req.body.role = "user";

    const user_data = await User.create(req.body);
    console.log(user_data);

    const token = await genCookie(user_data);

    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });

    res.status(201).send("user profile created");
  } catch (err) {
    console.log("error in createProfile: " + err);
    res.status(500).send("error: " + err.message);
  }
};

const loginProfile = async (req, res) => {
  try {
    const { email_id, password } = req.body;

    if (!email_id) {
      throw new Error("Missing Credentials");
    }
    if (!password) {
      throw new Error("Missing Credentials");
    }

    const userData = await User.findOne({ email_id });
    // console.log(...user);
    if (!userData) throw new Error("Invalid Email or Password");

    // console.log(...userData)

    // console.log(userData.password)

    // console.log(userData)

    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) throw new Error("Invalid Email or Password");

    const token = await genCookie(userData);
    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).send("Successfully LoggedIn");
  } catch (err) {
    console.log("error in loginProfile: " + err);
    res.status(500).send(err.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    if (
      !req.body.full_name ||
      !req.body.email_id ||
      !req.body.password ||
      !req.body.role
    )
      throw new Error("Missing Credentials");

    req.user.full_name = req.body.full_name;
    req.user.password = await bcrypt.hash(req.body.password, 10);
    console.log(req.user.full_name, " ", req.user.password);

    const data = await req.user.save();

    console.log(data);

    res.send("Updated Succesfully");
  } catch (err) {
    console.log("error in updateProfile: " + err);
    res.status(500).send(err.message);
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { token } = req.cookies;
    await client.set(`Blocked-Token:${token}`, "blocked");
    await res.clearCookie("token");
    // console.log(req.user._id);
    await User.findByIdAndDelete(req.user._id);
    res.send("Your are LoggedOut");
  } catch (err) {
    console.log("error in deleteProfile: " + err);
    res.status(500).send(err.message);
  }
};

export { createProfile, updateProfile, deleteProfile, loginProfile };
