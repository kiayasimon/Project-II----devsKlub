const express = require("express");
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');

const postsCtrl = require('../controllers/posts');

//GET /posts
router.get("/", postsCtrl.index);

//GET /posts/new
router.get("/new", ensureLoggedIn, postsCtrl.new);

//POST /posts
router.post("/", ensureLoggedIn, postsCtrl.create);

//DELETE /posts/:id
// router.delete("/posts/:id", ensureLoggedIn, postsCtrl.delete);

module.exports = router;