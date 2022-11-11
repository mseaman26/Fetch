const router = require("express").Router();
const { User, Dogs, Favorites } = require("../../models");
const sequelize = require('../../config/connection')

//localhost:3001/api/favorites
router.get("/", async (req, res) => {

  try {
    const dogData = await Dogs.findAll({
        // include: [{
        //     model: User, Favorites  
        // }]
    })
    
    const dogs = dogData.map((post) => 
        post.get({ plain: true }) 
    )
    res.json(dogs)
  }catch(err){
    console.log(err);
    res.status(500).json(err)
  }
  // try{
  //   console.log(req.session.user_id)
  //   const dbUserFavs = await User.findByPk(req.session.user_id, {
  //     include: [{
  //       model: Dogs
  //     }]
  //   })
  //   const userFavs = dbUserFavs.get({ plain: true})
  //   console.log(userFavs)
  //   res.json(userFavs)
  // }catch(err){
    
  // }



});


module.exports = router;
