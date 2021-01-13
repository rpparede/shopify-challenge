/*const Post = require("../database/models/Post")

const cloudinary = require('cloudinary')*/
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

  })



}
