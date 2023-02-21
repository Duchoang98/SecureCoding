"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const UserSubcriber_1 = require("../entities/UserSubcriber");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "tutorial",
    password: "privatepassword",
    database: "iam",
    entities: [User_1.User],
    subscribers: [UserSubcriber_1.UserSubscriber],
    synchronize: true,
    logging: true,
});
