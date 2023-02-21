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
const fastify_1 = __importDefault(require("fastify"));
const chai_1 = require("chai");
const chai = __importStar(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const fastify_2 = require("../../../lib/fastify");
const fastify_3 = require("../../../lib/fastify");
const fastify_4 = require("../../../lib/fastify");
chai.use(chai_as_promised_1.default);
// describe('/web-api/users', function () {
//   before(async function () {
//     // TODO: initialise the datasource (database connection)
//     await AppDataSource.initialize();
//   });
//   describe('POST #create', function () {
//     it('should register the user', async function () {
//       const payload = {
//         firstname: 'Hoang34',
//         lastname: 'Nguyen34',
//         email: 'hoang34@gmail.com',
//         password: '12345',
//         passwordConfirmation: '12345'
//       }
//       const response = await server.inject({ url: `/web-api/users`, method: 'POST', payload: payload })
//       console.log(response)
//       expect(response.statusCode).to.equal(201)
//     })
//   })
// })
describe('assertResponseSchemaPresenceHook', function () {
    it("throw an error if an unsafe route is registered", async function () {
        const route = async function (fastify) {
            fastify.post("/users/", {
                schema: {
                    body: {
                        properties: {
                            hello: 'world',
                        },
                    },
                },
                handler: async (request, reply) => {
                    return;
                },
            });
        };
        const server = (0, fastify_1.default)()
            .addHook('onRoute', fastify_3.assertsResponseSchemaPresenceHook)
            .register(route);
        await chai.expect(server).to.eventually.be.rejected.and.deep.include({
            message: 'Response schema is not defined'
        });
    });
});
describe('assertsValidationSchemaPresenceHook', function () {
    it("should enforce the presence of a validation schema for request body, query, or params", async function () {
        const route = async function (fastify) {
            fastify.post("/users/", {
                schema: {
                    response: {
                        properties: {
                            hello: 'world',
                        },
                    },
                },
                handler: async (request, reply) => {
                    return;
                },
            });
        };
        const server = (0, fastify_1.default)()
            .addHook('onRoute', fastify_4.assertsValidationSchemaPresenceHook)
            .register(route);
        await chai.expect(server).to.eventually.be.rejected.and.deep.include({
            message: 'Validation schema not found'
        });
    });
});
describe('setErrorHandler', function () {
    it('should return a standarlized response', async () => {
        const response = await fastify_2.server.inject({
            method: "GET",
            url: "/web-api/users/1"
        });
        (0, chai_1.expect)(response.statusCode).to.equal(500);
        (0, chai_1.expect)(response.statusMessage).to.equal('Internal Server Error');
    });
});
describe('Error handler', () => {
    it('handles a ValidationError', async () => {
        const payload = {
            firstname: 'Hoang111',
            email: 'hoang111@gmail.com',
            password: '12345',
            passwordConfirmation: '12345'
        };
        const response = await fastify_2.server.inject({
            method: 'POST',
            url: '/web-api/users',
            payload: {
                payload
            },
        });
        (0, chai_1.expect)(response.statusCode).to.equal(400);
    });
});
