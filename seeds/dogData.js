const { User, Dogs } = require("../models");
const fetch = require("node-fetch");
const dogNames = require('dog-names')

const seedDogs = async() => {
    try{
        const response = await fetch(
            "https://dog.ceo/api/breeds/image/random/50"
        )
        const dogData = (await response.json()).message;

        const dogs  = dogData.map((element)=>{
            let data = element.split('/');
            return {
                name: dogNames.allRandom(),
                url: element,
                breed: data[4],
                rating: Math.floor(Math.random() * 800) + 600
            }
        })
        console.log(dogs) 
        console.log(dogs.length)
        await Dogs.bulkCreate(dogs, { individualHooks: true });
    } catch(err){
        console.log(err);
    }

}
// seedDogs();
module.exports = seedDogs;