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

    app.get("/api/test/all", controller.allAccess);

    // Get user posts
    app.get(
        "/api/posts/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken],
        controller.adminBoard
    );
    app.post(
        "/posts/store",
        [authJwt.verifyToken],
        controller.userPost
    );

    app.delete(
        "/posts/:postId",
        [authJwt.verifyToken],
        controller.deletePost
    );
    app.put(
        "/posts/:postId",
        [authJwt.verifyToken],
        controller.editPost
    );
    /*  
      // Resource: POST
      app.get(
          "/posts",
          [authJwt.verifyToken],
          controller.allAccess
      );
      app.post(
          "/posts",
          [authJwt.verifyToken],
          controller.userPost
      );
      app.get(
          "/posts/:postId",
          [authJwt.verifyToken],
          //controller.userPost
      );

  */
};