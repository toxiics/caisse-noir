const controller = require("../controllers/team.controller");
// team model
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/team/all", controller.allAccess);

  // app.get("/api/team/user",  controller.userBoard);
  // app.get("/api/team/delete/:mail", controller.deleteUser);

  // app.get(
  //   "/api/team/mod",
  //   [teamJwt.verifyToken, teamJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/team/admin",
  //   [teamJwt.verifyToken, teamJwt.isAdmin],
  //   controller.adminBoard
  // );
};
