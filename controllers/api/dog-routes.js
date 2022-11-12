const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Dogs, User } = require("../../models");
var EloRating = require("elo-rating");

router.get("/", async (req, res) => {
  // find all dogs
  try {
    const dogData = await Dogs.findAll({
      // add associations
      include: [{ model: User }],
    });
    console.log(dogData);
    res.status(200).json(dogData);
    console.log("stuff");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find dog by id
  try {
    const dogData = await Dogs.findByPk(req.params.id, {
      // add associations
      include: [{ model: User }],
    });
    console.log(dogData);
    if (!dogData) {
      res.status(404).json({ message: "No dog with this ID" });
      return;
    }
    res.status(200).json(dogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:winners", async (req, res) => {
  // winner is selected by user
  try {
    const dogData = await Dogs.create(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!dogData) {
      res.status(404).json({ message: "No dog with this ID" });
      return;
    }
    res.status(200).json(dogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:losers", async (req, res) => {
  // loser is determined by user's "winner" selection
  try {
    const dogData = await Dogs.create(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!dogData) {
      res.status(404).json({ message: "No dog with this ID" });
      return;
    }
    res.status(200).json(dogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Localhost:3001/api/dogs/ranking/:id
// Given a dogs id, return how highly it is ranked out of the total database.
router.get("/ranking/:id", async (req, res) => {
  try {
    const [results, metadata] = await sequelize.query(`select * from 
    (
    select *, 
    RANK() OVER (ORDER BY rating DESC) dog_rank 
    from dogs) 
    as dog_ranking WHERE id = ${req.params.id}`);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
// localhost:3001/api/dogs/topdogs
// req.params.count = number of dogs you want to return
router.get("/topdogs/:count", async (req, res) => {
  try {
    const dogData = await Dogs.findAll({
      order: [["rating", "DESC"]],
      limit: Number(req.params.count),
    });
    const dogs = await dogData.map((element) => {
      return element.get({ plain: true });
    });
    res.json(dogs);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
localhost:3001/api/dogs/vote
Body
{
winner:dog_id,
loser:dog_id
}
 */
router.post("/vote", async (req, res) => {
  
  let result = EloRating.calculate(1450, 1535, true);
  console.log(result.playerRating);
  console.log(result.opponentRating);
  res.json({ winner: result.playerRating, loser: result.opponentRating });
});

module.exports = router;
