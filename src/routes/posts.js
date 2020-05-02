import _ from "lodash";
import Router from "express";
import { Post } from "../models";
import { userAuth } from "../Functions/auth";
import { check, validationResult } from "express-validator";

const router = Router();

const rulesForPost = [
  check("title", "Title of the post cannot be empty").not().isEmpty(),
  check("content", "Body of the post cannot be empty.").not().isEmpty(),
];

const postsLables = {
  docs: "posts",
  nextPage: "next",
  limit: "perPage",
  prevPage: "prev",
  meta: "paginator",
  page: "currentPage",
  pagingCounter: "slNo",
  totalDocs: "totalPosts",
  totalPages: "pageCount",
};

/**
 * @TYPE GET
 * @QUERY page
 * @ACCESS Public
 * @END_PT /api/posts/my-posts
 * @DESC To Get all the posts from the database
 */
router.get("/my-posts", userAuth, async (req, res) => {
  try {
    const options = {
      limit: 10,
      sort: { createdAt: -1 },
      customLabels: postsLables,
      populate: [
        {
          path: "author",
          select: "name username",
        },
      ],
      page: req.query ? req.query : 1,
    };
    let results = await Post.paginate({ author: req.user.id }, options);
    return res.status(200).json(results);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }
});

/**
 * @TYPE POST
 * @ACCESS Private
 * @END_PT /api/posts
 * @DESC To create a new post
 */
router.post("/", userAuth, rulesForPost, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  try {
    let post = await Post.create({
      ...req.body,
      author: req.user.id,
    });
    post = await post
      .populate({
        path: "author",
        select: "name username",
      })
      .execPopulate();

    return res.status(201).json({
      post,
      success: true,
      message: "Post created successfully.",
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }
});

/**
 * @TYPE GET
 * @QUERY page
 * @ACCESS Publit
 * @END_PT /api/posts
 * @DESC To Get all the posts from the database
 */
router.get("/", async (req, res) => {
  try {
    const options = {
      limit: 10,
      sort: { createdAt: -1 },
      customLabels: postsLables,
      page: req.query.page ? req.query.page : 1,
      populate: [
        {
          path: "author",
          select: "name username",
        },
      ],
    };
    let results = await Post.paginate({}, options);
    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/**
 * @TYPE GET
 * @PARAMS id
 * @ACCESS Public
 * @END_PT /api/posts
 * @DESC To Get a post from the database
 */
router.get("/:id", async (req, res) => {
  try {
    let post = await Post.findById(req.params.id)
      .populate({
        path: "author",
        select: "name username",
      })
      .exec();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({
      message: err.message,
      success: false,
    });
  }
});

/**
 * @TYPE PUT
 * @PARAMS id
 * @ACCESS Private
 * @END_PT /api/posts
 * @DESC To Edit a post from the database
 */
router.put("/:id", userAuth, rulesForPost, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json(errors);
  }

  let { id } = req.params;
  let userId = req.user.id;

  try {
    let post = await Post.findOneAndUpdate(
      { _id: id, author: userId.toString() },
      { ...req.body },
      { new: true }
    );

    if (!post) {
      throw new Error("Post not found.");
    }

    post = await post
      .populate({
        path: "author",
        select: "name username",
      })
      .execPopulate();

    return res.status(200).json({
      post,
      success: true,
      message: "Post updated successfully.",
    });

    // Now Edit the Post
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
});

/**
 * @PARAMS id
 * @TYPE DELETE
 * @ACCESS Private
 * @END_PT /api/posts
 * @DESC To Delete a post from the database
 */
router.delete("/:id", userAuth, async (req, res) => {
  try {
    // Check if the post belongs to the authenticated User
    let { id } = req.params;
    let userId = req.user.id;

    // Now Delete the Post
    let post = await Post.findOneAndDelete({
      _id: id,
      author: userId.toString(),
    });

    if (!post) {
      throw new Error("Post not found.");
    }

    post = await post
      .populate({
        path: "author",
        select: "name username",
      })
      .execPopulate();

    return res.status(200).json({
      post,
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
