const router = require("express").Router();
const { User, Dogs, Favorites } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    let currentUser = undefined;
    if (req.session.user_id) {
      const dbCurrentUser = await User.findByPk(req.session.user_id);
      currentUser = await dbCurrentUser.get({ plain: true });
      console.log(currentUser);
    }

    res.render("homepage", {
      currentUser: currentUser,
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
});

// voting page
router.get("/vote", withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);
    const dbDogs = await Dogs.findAll({
    });
    
    const dogVote = await dbDogs.map((dog) => {
       return dog.get({ plain: true });
    });
    let index1 = Math.floor(Math.random() * dogVote.length)
    function findAnotherRandomDog(){
        let index = Math.floor(Math.random() * dogVote.length)
        if(index !== index1){
            return index
        } else{
            return findAnotherRandomDog()
        }
    }
    let index2 = findAnotherRandomDog()
    let dogs = [dogVote[index1], dogVote[index2]]
    res.render("vote", {
      dogs: dogs,
        loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// localhost:3001/leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const dogData = await Dogs.findAll({
      order: [["rating", "DESC"]],
      limit: Number(7),
    });
    const dogs = await dogData.map((element) => {
      return element.get({ plain: true });
    });
    console.log(dogs);
    res.render("leaderboard", {
      dogs: dogs,
    });
  } catch (err) {
    res.json(err);
  }
});
//sign up page
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

//renders the current user's favorite dogs
router.get("/favorites", withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);
    const dbFavoriteDogs = await Dogs.findAll({
      include: [
        {
          model: User,
          where: {
            id: req.session.user_id,
          },
        },
      ],
    });
    const favoriteDogs = dbFavoriteDogs.map((dog) => dog.get({ plain: true }));
    console.log(favoriteDogs);
    console.log(favoriteDogs[0].users);
    res.render("favorites", {
      favoriteDogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
module.exports = router;
