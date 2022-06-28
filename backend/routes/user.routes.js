const {
  authJwt
} = require("../middlewares");
const controller = require("../controllers/user.controller");
// user model
const db = require("../models");
const {
  role
} = require("../models");
const User = db.user;
const Role = db.role;
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/auth/all", controller.allAccess);

  app.get("/api/auth/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/auth/delete/:mail", [authJwt.verifyToken], controller.deleteUser);

  // app.get(
  //   "/api/auth/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/auth/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};
