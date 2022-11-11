const {Dogs, User} = require('../models')


const seedFavorite = async(num) =>{
    try{
        const userData = await User.findAll();
        const dogData = await Dogs.findAll();
        for(let i = 0; i < num; i++)
        {
            try{
                await dogData[Math.floor(Math.random() * dogData.length)]
                .addUsers(userData[
                    Math.floor(Math.random() * userData.length)
                ])
            } catch(err){
                console.log("\n\nhaha")
            }
            
        }
    }
    catch (err){
        console.log(err)
    }
    
}
// seedFavorite(100);
module.exports = seedFavorite;