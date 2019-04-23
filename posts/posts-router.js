// importing express from express
const express = require("express");

const Posts = require("../data/db.js");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const post = req.body;
    console.log("New Post", req.body);
    if (
      post.title === undefined ||
      post.title === "" ||
      post.contents === "" ||
      post.contents === undefined
    ) {
      res.status(400).json({
        message: "Please provide title and contents for the post."
      });
    } else {
      const { id } = await Posts.insert(post);
      const addedPost = await Posts.findById(id);
      res.status(201).json(addedPost);
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.remove(req.params.id);
    if (post) {
      res.status(200).json({ message: "The post has been deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed"
    });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const post = await Posts.update(req.params.id, req.body);
//     if (post) {
//       res.status(200).json(post);
//     } else if (
//       post.title === undefined ||
//       post.title === "" ||
//       post.contents === "" ||
//       post.contents === undefined
//     ) {
//       res.status(400).json({
//         errorMessage: "Please provide title and contents for the post."
//       });
//     } else {
//       res
//         .status(404)
//         .json({ message: "The post with the specified ID does not exist." });
//     }
//   } catch (error) {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       error: "The post information could not be modified."
//     });
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, contents } = req.body;
    console.log("Updated Post", req.body);
    const post = await Posts.findById(id);

    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    if (!title || !contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post." });
    }
    const updateResult = await Posts.update(id, req.body);
    if (updateResult) {
      const post = await Posts.findById(id);
      res.status(200).json(post);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;
