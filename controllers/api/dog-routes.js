const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Dogs, User } = require("../../models");
var EloRating = require("elo-rating");
const { Op} = require('sequelize')

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
  console.log("winner route hit")
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
  try{
    // 2 return the dog models that are winnners and losers
    const dogData = await Dogs.findAll(
      {where: 
        {
          // WHERE ID: winner.id OR loser.id; 
          [Op.or]:
            [{id:Number(req.body.winner)},
             {id:Number(req.body.loser)}
            ]},
          attributes: ['id','rating']});
    let winner = dogData[0];
    let loser = dogData[1];
    //calculate new ratings for winner and loser
    let result = EloRating.calculate(winner.rating, loser.rating, true);
    //update the database;
    winner.update({rating:result.playerRating});
    loser.update({rating:result.opponentRating});
    res.json({ winner: winner.rating, loser: loser.rating });
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }
  
});

module.exports = router;
