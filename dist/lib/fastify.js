"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertsValidationSchemaPresenceHook = exports.assertsResponseSchemaPresenceHook = exports.server = void 0;
// import fastify
const fastify_1 = __importDefault(require("fastify"));
// import webApiRoutes
const web_api_routes_1 = require("../routes/web-api/web-api-routes");
// import variable environment 
const dotenv = __importStar(require("dotenv"));
// import ValidationError and EntityNotFoundError
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
dotenv.config({ path: "../../.env" });
const logger = process.env.FASTIFY_LOGGER;
const booleanLogger = logger === "true";
exports.server = (0, fastify_1.default)({ logger: booleanLogger, ajv: { customOptions: {
            removeAdditional: false
        }, } })
    .addHook('onRoute', assertsResponseSchemaPresenceHook)
    .register(web_api_routes_1.webApiRoutes, { prefix: '/web-api' });
exports.server.setErrorHandler((error, request, reply) => {
    if (error instanceof class_validator_1.ValidationError) {
        reply.status(400).send({ error: error.message });
    }
    else if (error instanceof typeorm_1.EntityNotFoundError) {
        reply.status(404).send({ error: 'Entity not found' });
    }
    else {
        reply.status(500).send({ error: 'Internal Server Error' });
    }
});
// server.post(
//   "/web-api/users",
//   {
//     schema: {
//       body: createUserRequestBody,
//       response: {
//         201: createUserResponseBody,
//       },
//     },
//   },
//   async (request, reply): Promise<void> => {
//     const repositoryUser = AppDataSource.getRepository(User);
//     const user = new User();
//     user.firstName = (request.body as any).firstname;
//     user.lastName = (request.body as any).lastname;
//     user.email = (request.body as any).email;
//     user.passwordHash = (request.body as any).password;
//     await repositoryUser.save(user);
//     const responseUser = new User();
//     responseUser.id = user.id;
//     responseUser.firstName = user.firstName;
//     responseUser.lastName = user.lastName;
//     responseUser.email = user.email;
//     await reply.status(201).send(responseUser);
//     await reply.status(201).send({ message: "User created successfully" });
//   }
// );
function assertsResponseSchemaPresenceHook(routeOptions) {
    var _a;
    if (!((_a = routeOptions.schema) === null || _a === void 0 ? void 0 : _a.response)) {
        throw new Error("Response schema is not defined");
    }
}
exports.assertsResponseSchemaPresenceHook = assertsResponseSchemaPresenceHook;
function assertsValidationSchemaPresenceHook(routeOptions) {
    var _a;
    if (!((_a = routeOptions.schema) === null || _a === void 0 ? void 0 : _a.body) || routeOptions.schema.querystring || routeOptions.schema.params) {
        throw new Error("Validation schema not found");
    }
}
exports.assertsValidationSchemaPresenceHook = assertsValidationSchemaPresenceHook;
