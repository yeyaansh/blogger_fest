import mongoose, { Schema } from "mongoose";
const blog_post_schema = new Schema(
  {
    title: {
      type: String,
      minLenth: 3,
      maxLength: 80,
      required: true,
    },
    description: {
      type: String,
      requried: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    likes: {
      type: Number,
      default: 0,
    },

    comments: [
      {
        type: String,
      },
    ],

    created_by: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blog_post_schema);

export default Blog;
