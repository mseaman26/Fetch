const router = require("express").Router();
const { User, Dogs, Favorites } = require("../models");
const withAuth = require('../utils/auth')

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
router.get("/vote",withAuth, async (req, res) => {
  try {
    res.render("vote");
  } catch (err) {
    console.log(err);
    res.status(500);
  }
  res.render("vote");
});

// localhost:3001/leaderboard
router.get("/leaderboard", withAuth, async (req, res) => {
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
router.get('/favorites', withAuth, async (req, res) => {
    try{
        console.log(req.session.user_id)
       
        const dbFavoriteDogs = await Dogs.findAll({
            // where: {
            //     user_id: req.session.user_id
            // },
            include: [{
                model: User,
                where: {
                    id: req.session.user_id
                }
            },
        ]
        })
        // console.log(dbFavoriteDogs)
        const favoriteDogs = dbFavoriteDogs.map((dog) => 
            dog.get({ plain: true })
        )
        console.log(favoriteDogs)
        console.log(favoriteDogs[0].users)
        res.render('favorites', {
            favoriteDogs,
            loggedIn: req.session.loggedIn
        })
        // res.json(dbFavoriteDogs)
    }catch(err){
        console.log(err)
        res.json(err)
    }
    
})
module.exports = router
