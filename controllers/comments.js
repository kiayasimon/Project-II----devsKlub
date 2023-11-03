const Post = require('../models/post');

module.exports = {
   create,
   delete: deleteComment
};

    async function create(req, res) {
        const post = await Post.findById(req.params.id);
      
        // Add the user-centric info to req.body (the new review)
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
      
        // We can push (or unshift) subdocs into Mongoose arrays
        post.comments.push(req.body);
        try {
          // Save any changes made to the movie doc
          await post.save();
        } catch (err) {
        //   console.log(err);
        }
        res.redirect(`/post/${post._id}`);
      }

      async function deleteComment(req, res) {
        // Note the cool "dot" syntax to query on the property of a subdoc
        const post = await Post.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
        // Rogue user!
        if (!post) return res.redirect('/posts');
        // Remove the review using the remove method available on Mongoose arrays
        post.comments.remove(req.params.id);
        // Save the updated movie doc
        await post.save();
        // Redirect back to the movie's show view
        res.redirect(`/posts/${post._id}`);
      }
      