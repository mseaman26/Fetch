const sequelize = require('../config/connection');
// import seedUser
const seedUser = require('./userData');
// import seedDogs
const seedDogs = require('./dogData');

const seedAll = async() => {
    await sequelize.sync({force:true});

    await seedUser();

    await seedDogs();

    process.exit(0);
}

seedAll();