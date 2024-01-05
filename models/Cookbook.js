const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

class Cookbook extends Model { }

Cookbook.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        creator_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id'
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        viewers: {
            type: DataTypes.ARRAY
        },
        editors: {
            type: DataTypes.ARRAY
        },
        recipes: {
            type: DataTypes.ARRAY
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'cookbook'
    }
);

module.exports = Cookbook;