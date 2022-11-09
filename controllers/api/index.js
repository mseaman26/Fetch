const router = require("express").Router();
const dogRoutes = require("./dog-routes");
const userRoutes = require("./user-routes");
const favoritesRoutes = require("./favorites-routes");

router.use("/dogs", dogRoutes);
router.use("/users", userRoutes);
router.use("/favorites", favoritesRoutes);

module.exports = router;
