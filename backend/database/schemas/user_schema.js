import mongoose, { Schema } from "mongoose";
const user_schema = new Schema({
  full_name: {
    type: String,
    minLenth: 3,
    maxLength: 30,
    required: true,
  },
  email_id: {
    type: String,
    requried: true,
  },

  password: {
    type: String,
    required: true,
  },

  created_post: [
    {
      type: String,
    },
  ],

  saved_post: [
    {
      type: String,
    },
  ],

  liked_post: [
    {
      type: String,
    },
  ],

  commented_post: [
    {
      type: String,
    },
  ],
},{timestamps:true});


const User = mongoose.model('user',user_schema);

export default User;