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
    unique:true
  },

  password: {
    type: String,
    required: true,
  },

  role:{
    type:String,
    enum:["admin","user"],
    default:"user",
    required:true
  },

  created_post: [
    {
      type: Schema.Types.ObjectId,
      ref:'blog'
    },
  ],

  saved_post: [
    {
      type: Schema.Types.ObjectId,
      ref:'blog'
    },
  ],

  liked_post: [
    {
      type: Schema.Types.ObjectId,
      ref:'blog'
    },
  ],

  commented_post: [
    {
      type: Schema.Types.ObjectId,
      ref:'blog'
    },
  ],
},{timestamps:true});


const User = mongoose.model('user',user_schema);

export default User;