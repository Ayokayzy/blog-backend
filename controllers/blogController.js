import { v4 as uuidv4 } from "uuid";
import FileStorage from "../model/fileStorage.js";
import { storage } from "../index.js";
import { validationResult } from "express-validator";

export const getBlogPost = (req, res) => {
  const data = Object.values(storage.all());
  res.status(200).json({ data: data });
};

export const addBlogPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      data: errors.array(),
    });
  const { title, content } = req.body;

  const blog = {
    id: uuidv4(),
    title,
    content,
    cratedAt: new Date(),
    updatedAt: new Date(),
  };
  const result = storage.save(blog);
  res.status(200).json({ message: "Blog created successfully", data: result });
};

export const updatePost = (req, res) => {
  const { id, title, content } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      data: errors.array(),
    });

  let blogs = storage.all();
  const foundBlog = blogs[id];
  if (!foundBlog)
    return res.status(404).json({ message: "Id does not match any blog" });

  foundBlog.title = title;
  foundBlog.content = content;
  foundBlog.updatedAt = new Date();
  storage.save(foundBlog);
  res.status(201).json({ message: "updates successful", data: blogs[id] });
};

export const getPost = (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);

  let blogs = storage.all();
  const foundBlog = blogs[id];
  if (!foundBlog)
    return res.status(404).json({ message: "Id does not match any blog" });
  res.status(201).json({ message: "Blog post", data: foundBlog });
};
