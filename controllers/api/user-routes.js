const router = require("express").Router();

//log in
router.post('/login', async (req, res) => {
    try{
        const currentUser = await User.findOne({
            where: {
                name: req.body.name
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

module.exports = router;