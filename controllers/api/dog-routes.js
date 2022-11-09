const router = require("express").Router();
const { Dog, User } = require("../../models");

router.get("/", async (req, res) => {
  // find all dogs
  try {
    const dogData = await Dog.findAll({
      // add associations here
    });
    console.log(dogData);
    res.status(200).json(dogData);
    console.log();
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find dog by id
  try {
    const dogData = await Dog.findByPk(req.params.id, {
      // add associations here
    });
    console.log(dogData);
    if (!dogData) {
      res.status(404).json({ message: "No dog with this id" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
  } catch (err) {}
});

module.exports = router;
