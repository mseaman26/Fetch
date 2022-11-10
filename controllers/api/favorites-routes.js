const router = require("express").Router();
const { User, Dogs, Favorites } = require("../../models");
const sequelize = require('../../config/connection')

//localhost:3001/api/favorites/User/Favorites
router.get("/User/Favorites", async (req, res) => {
  let favData = await User.findByPk(req.session.user_id, {
    include: [
      {
        model: Dogs
      }
    ]
  });

  console.log(favData);

  res.send("test");
});


module.exports = router;
