const Post = require('../models/post');

module.exports = {
  index,
  show,
  new: newPost,
  create,
  // delete: deletePost
};

async function index(req, res) {
  const posts = await Post.find({});
  res.render('posts/index', { title: 'All Posts', posts });
}

async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const post = await Post.findById(req.params.id);
//   const performers = await Performer.find({ _id: { $nin: movie.cast } }).sort('name');
  res.render('posts/show', { title: 'Reply Here', post});
}

function newPost(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('posts/new', { title: 'Add Post', errorMsg: '' });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
//   req.body.nowShowing = !!req.body.nowShowing;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new movie
    const post = await Post.create(req.body);
    // Redirect to the new movie's show functionality 
    res.redirect(`/posts/${post._id}`);
  } catch (err) {
    // Typically some sort of validation error
    // console.log(err);
    res.render('posts/new', { errorMsg: err.message });
  }
}


