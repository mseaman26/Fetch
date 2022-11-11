const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Dogs, User } = require("../../models");

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
module.exports = router;
