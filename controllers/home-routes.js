const router = require('express').Router();
const { User, Dogs } = require('../models');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
        })
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

//log in page
router.get('/login', async (req, res) => {
    try{
        res.render('login')
    }catch(err){
        console.log(err)
        res.status(500)
    }
    res.render('login')
})
// localhost:3001/leaderboard
router.get('/leaderboard', async (req,res) =>{
    try{
        res.render('leaderboard');

    } catch(err){
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
    res.render('signup')
})
module.exports = router
