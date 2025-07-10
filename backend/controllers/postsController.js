import Blog from "../database/schemas/blog_post_schema.js";

const viewPost = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    if (!id) throw new Error("This Blog Post Doesn't Exist");

    const blog_post_data = await Blog.findById(id);

    if (!blog_post_data) throw new Error("This Blog Post Doesn't Exist");

    res.status(200).send(blog_post_data);
  } catch (err) {
    console.log("error in viewPost: " + err);
    res.status(500).send(err.message);
  }
};

const createPost = async (req, res) => {
  try {
    // const {title,description} = req.body;

    if (!req.body.title || !req.body.description)
      throw new Error("Missing Title or Desciption)");

    const data = {
      title: req.body.title,
      description: req.body.description,
      created_by: req.user._id,
    };

    const { tags } = req.body;

    if (tags) {
      if (tags.length) data.tags = tags;
    }

    // console.log(data)
    const blog_data = await Blog.create(data);

    console.log(blog_data);
    res.status(201).send("Post Successfully Created");
  } catch (err) {
    console.log("error in createPost: " + err);
    res.status(500).send(err.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("This Blog Post Doesn't Exist");

    const blog_post_data = await Blog.findById(id);

    if (!blog_post_data) throw new Error("This Blog Post Doesn't Exist");

    // check if the user own's the post or not

    if (!req.user._id.equals(blog_post_data.created_by))
      throw new Error("You do not own this post");

    // console.log(req.user._id.equals(blog_post_data.created_by));

    const { title, description, tags } = req.body;

    blog_post_data.title = title;
    blog_post_data.description = description;

    if (tags) {
      if (tags.length) blog_post_data.tags = tags;
    }

    const newData = await blog_post_data.save();
    console.log(newData);
    res.send("successfully updated");
  } catch (err) {
    console.log("error in updatePost: " + err);
    res.status(500).send(err.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("This Blog Post Doesn't Exist");

    const postsData = await Blog.findById(id);

    if (!postsData) {
      throw new Error("This Blog Post Doesn't Exist");
    }

    if (!req.user._id.equals(postsData.created_by)) {
      throw new Error("You do not own this post");
    }

    await Blog.findOneAndDelete(id);
    res.status(200).send("Post Deleted Successfully");
  } catch (err) {
    console.log("error in deletePost: " + err);
    res.status(500).send(err.message);
  }
};

// what user's perform on any post

const likePost = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("This Blog Post Doesn't Exist");

  const postsData = await Blog.findById(id);

  if (!postsData) {
    throw new Error("This Blog Post Doesn't Exist");
  }

  const { liked_post } = req.user; // extract the liked_post array

  if (liked_post.length) {
    // if array has atleast one post liked (data) in database

    const doExists = liked_post.some((checker) => checker.equals(id));

    if (doExists) {
      postsData.likes--;

      req.user.liked_post = req.user.liked_post.filter((data) =>
        !data.equals(id)
      );
      console.log(liked_post);
      console.log("abhi hua hai bhiaya: " + postsData.likes);
      await req.user.save();
      await postsData.save();
    }

    //     postsData.likes--;
    //     await req.user.save(); // save user's data (with updated liked_post array)
    //     await postsData.save(); // save post's data (with updated likes count)
    //     console.log("minus karne ka logic likhata hoon bhai..");
    //     break;
  } else {
    postsData.likes++; // increase the number(like) by one;
    liked_post.push(postsData._id); // push the post id in user's liked_post array;

    await req.user.save(); // save user's data (with updated liked_post array)
    await postsData.save(); // save post's data (with updated likes count)
  }

  res.send(postsData.likes);
};
const commentPost = async (req, res) => {};
export { viewPost, createPost, updatePost, deletePost, likePost, commentPost };
