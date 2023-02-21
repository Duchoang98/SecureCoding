"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webApiRoutes = void 0;
const User_1 = require("../../entities/User");
const typeorm_1 = require("../../lib/typeorm");
const createUserRequestBody_json_1 = __importDefault(require("../../schemas/createUserRequestBody.json"));
const createUserResponseBody_json_1 = __importDefault(require("../../schemas/createUserResponseBody.json"));
async function webApiRoutes(fastify) {
    fastify.get("/users/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "number" },
                },
                required: ["id"],
            },
            response: {
                200: createUserResponseBody_json_1.default,
            },
        },
        handler: async (request, reply) => {
            try {
                const user = await typeorm_1.AppDataSource.getRepository(User_1.User).findOneBy({
                    id: request.params.id,
                });
                await reply.send(user);
            }
            catch (Error) {
                await reply.status(500).send(Error);
            }
        },
    });
    fastify.post("/web-api/users", {
        schema: {
            body: createUserRequestBody_json_1.default,
            response: {
                201: createUserResponseBody_json_1.default,
            },
        },
    }, async (request, reply) => {
        const repositoryUser = typeorm_1.AppDataSource.getRepository(User_1.User);
        const user = new User_1.User();
        user.firstName = request.body.firstname;
        user.lastName = request.body.lastname;
        user.email = request.body.email;
        user.passwordHash = request.body.password;
        await repositoryUser.save(user);
        const responseUser = new User_1.User();
        responseUser.id = user.id;
        responseUser.firstName = user.firstName;
        responseUser.lastName = user.lastName;
        responseUser.email = user.email;
        await reply.status(201).send(responseUser);
        await reply.status(201).send({ message: "User created successfully" });
    });
}
exports.webApiRoutes = webApiRoutes;
;
