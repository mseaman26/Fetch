const router = require("express").Router();
const { User, Dog } = require("../../models");

router.get("/", async (req, res) => {
    // find all users
    try {
      const userData = await User.findAll({
        // add associations here
      });
      console.log(userData);
      res.status(200).json(userData);
      console.log();
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/:id", async (req, res) => {
    // find user by id
    try {
      const userData = await User.findByPk(req.params.id, {
        // add associations here
      });
      console.log(userData);
      if (!userData) {
        res.status(404).json({ message: "No user with this id" });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post("/:winner", async (req, res) => {
    // winner is selected by user
    try {
    } catch (err) {}
  });


module.exports = router;