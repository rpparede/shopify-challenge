module.exports = (req, res, next) => {
  console.log("StoreMiddleware")
  /*if (!req.body.title || !req.body.subtitle) {
    return res.redirect('/post/new')
  }*/

  next()

}
