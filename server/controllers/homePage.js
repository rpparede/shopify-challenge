//const Post = require("../database/models/Post")

module.exports = async (req, res) => {

  //const posts = await Post.find({}).populate('author');
  console.log("posts")
  /*res.render("index", {
    posts

  });*/
  //res.send("Hitting home page controller");
  //res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ test1: "1 " }));
}
