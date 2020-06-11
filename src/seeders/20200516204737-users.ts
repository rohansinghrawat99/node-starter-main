import { dbService } from "../services/db.service";
import faker from "faker";
import { Role } from "../util/enum.util";
import { Helpers } from "../util/helpers.util";
import { User } from "../models/user.model";

dbService; // Initialising Sequelize...


const users: any[] = [
    {
        first_name: "Rohan",
        last_name: "Singh Rawat",
        email: "rsrofficial99@gmail.com",
        password: "secret",
        mobile_number: "9999999999",
        role: Role.ADMIN
    }
];

export = {

    up: async () => {

        const roles = Helpers.iterateEnum(Role);

        for (let i = 0; i < 20; i++) {

            users.push({
                first_name: faker.name.firstName(0),
                last_name: faker.name.lastName(0),
                email: faker.internet.email(),
                password: "secret",
                mobile_number: faker.phone.phoneNumber(),
                role: faker.random.arrayElement(roles),
                createdAt: new Date()
            });
        }

        return User.bulkCreate(users);
    },

    down: async () => {
        return User.truncate();
    }
};
