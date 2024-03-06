import express from "express";
import bodyParser from "body-parser";
import blog from "./routes/blog.js";
import db from "./storage/db.js";
import FileStorage from "./storage/fileStorage.js";

export const storage = new FileStorage();
storage.reload();

const app = express();
const port = 8080;

// middlwares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to my blog");
});

// routes
app.use("/blog", blog);

db()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("db error");
    console.log(err);
  });
