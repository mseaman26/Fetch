const router = require("express").Router();
const { User, Dogs, Favorites } = require("../../models");
const sequelize = require('../../config/connection')

//localhost:3001/api/favorites
router.get("/", async (req, res) => {

  // try {
  //   const dogData = await Dogs.findAll({
  //   })

  //   const dogs = dogData.map((post) => 
  //       post.get({ plain: true }) 
  //   )
  //   res.json(dogs)
  //   }catch(err){
  //     console.log(err);
  //     res.status(500).json(err)
  // }


});


module.exports = router;
