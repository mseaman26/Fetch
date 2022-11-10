const {Dogs, User} = require('../models')


const seedFavorite = async() =>{
    try{
        const userData = await User.findAll();
        const dogData = await Dogs.findAll();
        dogData[0].addUsers(userData[0]);
    }
    catch (err){
        console.log(err)
    }
    
}

module.exports = seedFavorite;