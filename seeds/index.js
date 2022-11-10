const sequelize = require("../config/connection");
// import seedUser
const seedUser = require("./userData");
// import seedDogs
const seedDogs = require("./dogData");
const seedFavorite = require('./favoriteData');
// const { Dogs, User } = require("../models");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedDogs();

  // await seedFavorite();

  // const dummy = await Dogs.create({
  //   name: "Tank",
  //   url: "https://images.dog.ceo/breeds/cattledog-australian/IMG_5481.jpg",
  //   breed: "cattledog-australian",
  //   rating: 1159,
  // });
  // const usDummy = await User.create({
  //   first_name: "James",
  //   last_name: "Doe",
  //   password: "password",
  //   email: "james.doe@example.com",
  // });

  //   dummy.getUsers();
  //   console.log(Object.keys(User.__proto__));
  //   console.log(Object.getOwnPropertyNames(Dogs).concat(Object.getOwnPropertyNames(Dogs.__proto__)));
  //   console.log(dummy.getAssociations)
  // console.log(Object.keys(Dogs.prototype));
  // console.log(await dummy.addUsers(usDummy));
  process.exit(0);
};

seedAll();
