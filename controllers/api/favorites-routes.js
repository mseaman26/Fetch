const router = require("express").Router();
const { User, Dogs } = require("../../models");
const sequelize = require('../../config/connection')

//localhost:3001/api/favorites/User/Favorites
router.get("/User/Favorites", async (req, res) => {
  console.log("I am in the route who")
  //create dummy data
  await sequelize.sync();
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
  await dog1.addUser(user1);
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
