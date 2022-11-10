const router = require("express").Router();
const { User, Dogs } = require("../models");

router.get("/", async (req, res) => {
  try {
    const leaderboardData = await Dogs.findByPk(req.params.rating, {
      include: [{ model: User }],
    });
    res.status(200).json(leaderboardData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
