const router = require("express").Router();
const { User, Dogs, Favorites } = require("../../models");
const sequelize = require('../../config/connection')

//localhost:3001/api/favorites/User/Favorites
router.get("/User/Favorites", async (req, res) => {
  //create dummy data
  await sequelize.sync({force: true});
  const user1 = await User.create(
    { first_name: 'Philip',
      last_name: 'Huang',
      email: 'example@example.com',
      password: 'password'
  });
  const user2 = await User.create(
    { first_name: 'Peter',
      last_name: 'Miron',
      email: 'example2@example.com',
      password: 'password'
  });
  const dog1 = await Dogs.create({
    name: 'Bacon',
    breed: 'Labrodoodle',
    rating: 1289
  })

//create association between users and dogs using .get


  // await dog1.addUser(user1);
  console.log(user1)
  console.log(dog1);
  console.log("create error")
  // console.log(Dogs.getOwnPropertyNames(dog1).filter(item => typeof dog1[item] === 'function'))
  // const favorite1 = await Favorites.create(
  //   {dog_id: dog1.id,
  //     user_id: user1.id,
  //   }
  // );
  console.log("after err")
  // get all the dogs who this user favorites
  // req.session.user_id is this.id
  const dogData = await Dogs.findAll({
    include: [
      {
        model: User,
        through: {
          where: {
            user_id: 1,
          },
        },
      },
    ],
  });
  res.status(200).json(dogData);
});



module.exports = router;
