import { v4 as uuidv4 } from "uuid";
import { storage } from "../index.js";
import { validationResult } from "express-validator";
import Blog from "../model/blog.js";

export const getBlogPost = async (req, res) => {
  // const data = Object.values(storage.all());
  // res.status(200).json({ data: data });
  try {
    const blogs = await Blog.find({});
    res.status(200).json({ message: "All posts", data: blogs });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addBlogPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      data: errors.array(),
    });
  const { title, content } = req.body;

  const result = await Blog.create({ title, content });
  if (!result) return res.status(500).json({ message: "Internal error" });
  res.status(201).json({ message: "Post created", data: result });
};

export const updatePost = async (req, res) => {
  const { id, title, content } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      data: errors.array(),
    });

  try {
    const foundPost = await Blog.findOne({ _id: id });
    if (title) foundPost.title = title;
    if (content) foundPost.content = content;
    const result = await foundPost.save();
    res.status(200).json({ message: "Updated post", data: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  // let blogs = storage.all();
  // const foundBlog = blogs[id];
  // if (!foundBlog)
  //   return res.status(404).json({ message: "Id does not match any blog" });

  // foundBlog.title = title;
  // foundBlog.content = content;
  // foundBlog.updatedAt = new Date();
  // storage.save(foundBlog);
  // res.status(201).json({ message: "updates successful", data: blogs[id] });
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.send(400).json({ message: "provide post id" });
    const foundPost = await Blog.findOne({ _id: id });
    if (!foundPost)
      return res.status(404).json({ message: "Id doen not match any post" });
    res.status(200).json({ message: "post", data: foundPost });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.send(400).json({ message: "provide post id" });
    const foundPost = await Blog.findOne({ _id: id });
    if (!foundPost)
      return res.status(404).json({ message: "Id doen not match any post" });
    await Blog.deleteOne({ _id: id });
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
