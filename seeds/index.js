const sequelize = require('../config/connection');
// import seedUser
const seedUser = require('./userData');
// import seedDogs





const seedAll = async() => {
    await sequelize.sync({force:true});

    await seedUser();

    process.exit(0);
}

seedAll();