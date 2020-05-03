import Sequelize from "sequelize";
import { Helpers } from "../util/helpers.util";
import { Role } from "../util/enum.util";

export = {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable("users", {
            id       : {
                allowNull    : false,
                primaryKey   : true,
                autoIncrement: true,
                type         : Sequelize.BIGINT
            },
            first_name     : {
                allowNull: false,
                type     : Sequelize.STRING
            },
            last_name     : {
                allowNull: false,
                type     : Sequelize.STRING
            },
            email     : {
                allowNull: false,
                type     : Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            mobile_number     : {
                allowNull: false,
                type     : Sequelize.STRING
            },
            role     : {
                allowNull: false,
                type     : Sequelize.ENUM({values: Helpers.iterateEnum(Role)})
            },
            createdAt: {
                allowNull: true,
                type     : Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type     : Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type     : Sequelize.DATE
            }
        });
    },

    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable("users");
    }
};
