"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionFixture = exports.buildSessionFixture = void 0;
const session_js_1 = require("../../entities/session.js");
const users_fixtures_js_1 = require("./users-fixtures.js");
const typeorm_js_1 = require("../../lib/typeorm.js");
function buildSessionFixture(opts = {}) {
    var _a;
    const session = new session_js_1.Session();
    session.user = (_a = opts.user) !== null && _a !== void 0 ? _a : (0, users_fixtures_js_1.buildUserFixture)();
    return session;
}
exports.buildSessionFixture = buildSessionFixture;
async function createSessionFixture(opts = {}) {
    return typeorm_js_1.AppDataSource.getRepository(session_js_1.Session).save(buildSessionFixture(opts));
}
exports.createSessionFixture = createSessionFixture;
