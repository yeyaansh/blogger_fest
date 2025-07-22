import mongoose, { Schema } from "mongoose";
const blog_post_schema = new Schema(
  {
    title: {
      type: String,
      minLength: 3,
      maxLength: 100,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
