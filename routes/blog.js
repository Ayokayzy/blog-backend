import express from "express";
import { check } from "express-validator";
import {
  addBlogPost,
  getBlogPost,
  getPost,
  updatePost,
} from "../controllers/blogController.js";

const router = express.Router();

router
  .route("/")
  .get(getBlogPost)
  .post(
    [
      check("title", "title is required").notEmpty().isLength(5),
      check("content", "content is requred").notEmpty().isLength(10),
    ],
    addBlogPost
  )
  .patch(
    [
      check("id", "id is required").notEmpty(),
      check("title", "title is required").notEmpty().isLength(5),
      check("content", "content is requred").notEmpty().isLength(10),
    ],
    updatePost
  )
  .delete();

  router.route('/:id').get(getPost)

export default router;
