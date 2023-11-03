const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /comments/:id/comments (create comment for a post)
router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create);

// DELETE /comments/:id (delete a comment)
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);

//PUT /comments/:id (update a comment)
router.put('/comments/:id', ensureLoggedIn, commentsCtrl.update);

module.exports = router;
