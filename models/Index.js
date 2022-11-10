const User = require('./User');
const Dogs = require('./Dogs');
const Favorites = require('./Favorites');

User.belongsToMany(Dogs, { through: Favorites,});

Dogs.belongsToMany(User, { through: Favorites,});


module.exports = { User, Dogs, Favorites };