"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserFixture = exports.buildUserFixture = void 0;
const user_js_1 = require("../../entities/user.js");
const faker_1 = require("@faker-js/faker");
const typeorm_js_1 = require("../../lib/typeorm.js");
function buildUserFixture(opts = {}) {
    var _a, _b, _c;
    const user = new user_js_1.User();
    user.firstName = (_a = opts.firstName) !== null && _a !== void 0 ? _a : faker_1.faker.name.firstName();
    user.lastName = (_b = opts.lastName) !== null && _b !== void 0 ? _b : faker_1.faker.name.lastName();
    user.email = (_c = opts.email) !== null && _c !== void 0 ? _c : faker_1.faker.internet.email();
    // that hash matches password 'changethat', hardcoded so we save CPU hasing time
    user.passwordHash = '$2a$12$dm2t30Y07Mt9TklkLOuy.efFIJ69WTW3f7NmwH8uioX9R6NHMQSXO';
    return user;
}
exports.buildUserFixture = buildUserFixture;
function createUserFixture(opts = {}) {
    return typeorm_js_1.AppDataSource.getRepository(user_js_1.User).save(buildUserFixture(opts));
}
exports.createUserFixture = createUserFixture;
