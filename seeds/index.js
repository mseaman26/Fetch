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

  await seedFavorite(100);

  process.exit(0);
};
// Don't Delete, Shows magic methods
//console.log(Object.keys(User.prototype));
seedAll();
