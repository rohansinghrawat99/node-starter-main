#!/bin/bash
fileName=$1
if [ "$fileName" == "" ]; then
  RED='\033[0;31m'
  NC='\033[0m' # No Color
  printf "${RED}ERROR!${NC} File name is Required!\n"
  exit
fi
echo "New migration created."
cat >./src/migrations/$(date +"%Y%m%d%H%M%S")-$fileName.ts <<EOF
import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
    /**
     * Write code here for migration.
     *
     * @param queryInterface
     * @param Sequelize
     */
    up: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        //
    },

    /**
     * Write code here for migration rollback.
     *
     * @param queryInterface
     * @param Sequelize
     */
    down: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        //
    }
};
EOF
