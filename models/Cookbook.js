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
                key: 'id'
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
        // viewers: {
        //     type: DataTypes.JSON
        // },
        // editors: {
        //     type: DataTypes.JSON
        // },
        // recipes: {
        //     type: DataTypes.JSON
        // }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'cookbook'
    }
);

module.exports = Cookbook;