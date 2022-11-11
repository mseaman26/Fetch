const router = require("express").Router();
const { User, Dogs } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//log in page
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
    res.status(500);
  }
  res.render("login");
});

// voting page
router.get("/vote", async (req, res) => {
  try {
    res.render("vote");
  } catch (err) {
    console.log(err);
    res.status(500);
  }
  res.render("vote");
});

// localhost:3001/leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    res.render("leaderboard");
  } catch (err) {
    res.json(err);
  }
});
//sign up page
router.get('/signup', async (req, res) => {
    try{
        res.render('signup')
    }catch(err){
        console.log(err)
        res.status(500) 
    }
    
})
router.get('/favorites', async (req, res) => {
    try{
        const dbFavorites = await Dogs.findAll({

        })
        // console.log(dbFavorites)
        const favorites = dbFavorites.map((dog) => {
           return dog.get({ plain: true })
        })
        console.log(favorites)
        res.render('favorites', {
            favorites,
            loggedIn: req.session.loggedIn
        })
    }catch(err){
        console.log(err)
        res.json(err)
    }
    
})
module.exports = router
