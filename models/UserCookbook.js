const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserCookbook extends Model {};

UserCookbook.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },

        cookbook_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'cookbook',
                key: 'id'
            }
        },

        permissions: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_cookbook',
    }
);

module.exports = UserCookbook;