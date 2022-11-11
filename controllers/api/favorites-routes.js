const router = require("express").Router();
const { User, Dogs, Favorites } = require("../../models");
const sequelize = require('../../config/connection')

//add dog to favorites
router.post("/", async (req, res) => {
    try{
      const newFavorite = await Favorites.create({
        user_id: req.body.user_id,
        dog_id: req.body.dog_id
      })
      res.status(200).json(newFavorite)
    }catch(err){
      console.log(err)
      res.status(500).json
    }

});


module.exports = router;
