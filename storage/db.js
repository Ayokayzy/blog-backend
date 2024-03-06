import mongoose from "mongoose";

const db = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/myBlog");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

export default db;
