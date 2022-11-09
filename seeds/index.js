const sequelize = require('../config/connection');
// import seedUser
// import seedDogs





const seedAll = async() => {
    await sequelize.sync({force:true});

    process.exit(0);
}

seedAll();