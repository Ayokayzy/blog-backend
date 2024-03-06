import fs from "fs";

class FileStorage {
  objects = {};
  filename = "blog_file";
  constructor() {}

  all() {
    return this.objects;
  }

  reload() {
    fs.readFile(this.filename, "utf-8", (err, data) => {
      if (err) return {};
      this.objects = JSON.parse(data);
    });
  }

  save(blog) {
    this.objects[blog.id] = blog;
    fs.writeFile(this.filename, JSON.stringify(this.objects), (err) => {
      if (err) throw err;
    });
    return blog;
  }
}
export default FileStorage;
