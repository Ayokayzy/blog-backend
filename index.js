import express from "express";
import bodyParser from "body-parser";
import blog from "./routes/blog.js";
import FileStorage from "./model/fileStorage.js";

export const storage = new FileStorage()
storage.reload();

const app = express();
const port = 8080;

// middlwares
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to my blog");
});

// routes
app.use("/blog", blog);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
