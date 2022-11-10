const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorites extends Model {}

Favorites.init(
  {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
         references: {
         model: 'user',
         key: 'id',
      },
    },
    dog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'dog',
            key: 'id',
         },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorites',
  }
);

module.exports = Favorites;
