/*const Post = require("../database/models/Post")*/

const cloudinary = require('cloudinary')
const path = require("path");
module.exports = (req, res) => {
  console.log("STORE POST control")

  const image = req.files.picture
  const uploadPath = path.resolve("uploads/", image.name)
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
      console.log("**ERROR STORING POST**")
      console.log(result.secure_url)
      res.send(result.secure_url);


    });

  })


}
