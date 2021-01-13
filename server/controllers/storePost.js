/*const Post = require("../database/models/Post")
const path = require("path");
const cloudinary = require('cloudinary')*/
module.exports = (req, res) => {
  console.log("STORE POST control")
  res.send(JSON.stringify({ test1: "store works" }));
  /*
    const { image } = req.files
    const uploadPath = path.resolve(__dirname, '..', "public/posts", image.name)
    image.mv(uploadPath, (error) => {
      if (error) {
        console.log("**ERROR  MOVING FILE TO PATH**")
        console.log(error)
      }
      cloudinary.v2.uploader.upload(uploadPath, (error, result) => {
  
        if (error) {
          console.log("**ERROR  POSTING TO CLOUDINARY**")
          console.log(error)
          return res.redirect('/')
        }
  
        Post.create({
          ...req.body,
          image: result.secure_url,
          //image: `/posts/${image.name}`,
          author: req.session.userId
        }, (error, post) => {
          console.log("**ERROR STORING POST**")
          console.log(post)
          res.redirect("/");
        });
  
  
  
  
  
  
  
  
      });
  
    })
  
  */

}
