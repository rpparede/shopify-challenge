const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Get all posts//get posts
  app.get("/api/posts", controller.allAccess);

  // Get user posts
  app.get(
    "/api/posts/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  // Store user posts
  app.post(
    "/api/posts/store",
    [authJwt.verifyToken],
    controller.userPost
  );
  // Delete user posts
  app.delete(
    "/api/posts/:postId",
    [authJwt.verifyToken],
    controller.deletePost
  );
  // Edit user posts
  app.put(
    "/api/posts/:postId",
    [authJwt.verifyToken],
    controller.editPost
  );

};