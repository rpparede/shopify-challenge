module.exports = (req, res, next) => {
  console.log("StoreMiddleware")
  //const values = Object.values(req.files)
  console.log(req.body)
  /*if (!req.body.title || !req.body.subtitle) {
    return res.redirect('/post/new')
  }*/

  next()

}
