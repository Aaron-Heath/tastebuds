const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class CookbookRecipe extends Model {};

CookbookRecipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        cookbook_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'cookbook',
                key: 'id'
            }
        },

        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'cookbook_recipe',
    }
);

module.exports = CookbookRecipe;