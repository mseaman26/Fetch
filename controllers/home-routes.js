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

router.get('/login', async (req, res) => {
    try{
        res.render('login')
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
    res.render('login')
})
module.exports = router