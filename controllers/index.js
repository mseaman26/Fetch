const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const leaderRoutes = require("./leaderboard-routes.js");
const favoritesRoutes = require("./favorites-routes.js")

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/leaderboard", leaderRoutes);
router.use("/favorites-routes", favoritesRoutes);
router.use("*", (req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
