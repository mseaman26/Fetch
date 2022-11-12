const router = require("express").Router();
const { User, Dogs, Favorites } = require("../../models");
const sequelize = require('../../config/connection')

//add dog to favorites
router.post("/", async (req, res) => {
  console.log("route hit")
  res.status(200)
    try{
      console.log("fav route")
      console.log(req.session.user_id)
      const newFavorite = await Favorites.findOrCreate({
        where: {
          user_id: req.session.user_id,
          dog_id: req.body.dog_id
        }
        
      })
      res.status(200).json(newFavorite)
    }catch(err){
      console.log(err)
      res.status(500).json
    }

});

//remove dog from favorites
router.delete('/', async (req, res) => {
  try{
    const favToDelete = await Favorites.findOne({
      where: {
        user_id: req.session.user_id,
        dog_id: req.body.dog_id
      }
    })
    favToDelete.destroy({})
    res.status(200).json({ message: "favorite deleted"})
  }catch(err){
    console.log(err)
  }
})


module.exports = router;
