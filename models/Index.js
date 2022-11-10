const User = require("./User");
const Dogs = require("./Dogs");
const Favorites = require("./Favorites");

User.belongsToMany(Dogs, { through: Favorites, foreignKey: "user_id"});

Dogs.belongsToMany(User, { through: Favorites, foreignKey: "dog_id"});


module.exports = { User, Dogs, Favorites };
