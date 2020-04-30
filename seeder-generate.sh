#!/bin/bash
fileName=$1
if [ "$fileName" == "" ]; then
  RED='\033[0;31m'
  NC='\033[0m' # No Color
  printf "${RED}ERROR!${NC} File name is Required!\n"
  exit
fi
echo "New seeder created."
cat >./src/seeders/$(date +"%Y%m%d%H%M%S")-$fileName.ts <<EOF
import { QueryInterface, SequelizeStatic } from "sequelize";
import { dbService } from "../services/db.service";

dbService; // Initialising Sequelize...

export = {
    /**
     * Write code here to seed data.
     *
     * @param queryInterface
     * @param Sequelize
     */
    up: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        // return Model.create({
        //     //
        // });
    },

    /**
     * Write code here for drop seed data.
     *
     * @param queryInterface
     * @param Sequelize
     */
    down: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        // return Model.truncate();
    }
};
EOF
