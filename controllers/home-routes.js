const router = require('express').Router();
const { User, Dogs } = require('../models');

router.get('/login', (req, res) => {
    res.render('login')
})