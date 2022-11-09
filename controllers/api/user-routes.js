const router = require("express").Router();
const { User, Dogs } = require("../../models");

//log in
router.post('/login', async (req, res) => {
    try{
        const currentUser = await User.findOne({
            where: {
                email: req.body.email
            },
        }) 
        if (!currentUser){
            res.status(404).json("Login Failed.  Incorrect username and/or password")
            return
        }
        req.session.save(() => {
            req.session.user_id = currentUser.id
            req.session.loggedIn = true
            res.status(200).json({message: "Login Successful!"})
        })
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/", async (req, res) => {
  // find all users
  try {
    const userData = await User.findAll({
      // add associations here
      include: [{ model: Dogs }],
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
      include: [{ model: Dogs }],
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

module.exports = router;
