const {Dogs, User } = require("../models");
const fetch = require("node-fetch");
const dogNames = require('dog-names')

const seedDogs = async() => {
    try{
        const userData = await User.findAll();
        const users = userData.map((element)=>{
            return element.get({plain:true});
        })
        // console.log(users);
        const response = await fetch(
            "https://dog.ceo/api/breeds/image/random/50"
        )
        const dogData = (await response.json()).message;

        const dogs  = dogData.map((element)=>{
            let data = element.split('/');
            return {
                name: dogNames.allRandom(),
                url: element,
                //reformats breed info so that it is human readable
                // from terrier-yorkshire to yorkshire terrier
                breed: (data[4]).split('-').reverse().join(" "),
                rating: Math.floor(Math.random() * 800) + 600,
                users: [users[Math.floor(Math.random() * users.length)]],
                include: [{association:User}],
            }
        })
        // console.log(dogs) 
        // console.log(dogs.length)
        await Dogs.bulkCreate(dogs, { individualHooks: true});
    } catch(err){
        console.log(err);
    }
}
// seedDogs();
module.exports = seedDogs;