import fastify, { FastifyInstance, RouteOptions } from "fastify";
import { expect } from "chai";

import * as chai from "chai";

import chaiAsPromised from 'chai-as-promised';

import { AppDataSource } from "../../../lib/typeorm";
import { server } from '../../../lib/fastify'

import { assertsResponseSchemaPresenceHook } from "../../../lib/fastify";
import { assertsValidationSchemaPresenceHook } from "../../../lib/fastify";

chai.use(chaiAsPromised);

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

describe('assertResponseSchemaPresenceHook',function () {
  it("throw an error if an unsafe route is registered", async function() {
    
    const route = async function (fastify: FastifyInstance) {
      fastify.post("/users/", {
        schema: {
          body: {
            properties: {
              hello: 'world',
            },
          },
        },
        handler: async (request, reply): Promise<void> => {
          return
        },
      });
    };


    const server = fastify()
    .addHook('onRoute', assertsResponseSchemaPresenceHook)
    .register(route)

    await chai.expect(server).to.eventually.be.rejected.and.deep.include({
      message: 'Response schema is not defined'
    });
  })
})

describe('assertsValidationSchemaPresenceHook',function () {
  it("should enforce the presence of a validation schema for request body, query, or params", async function() {
    
    const route = async function (fastify: FastifyInstance) {
      fastify.post("/users/", {
        schema: {
          response: {
            properties: {
              hello: 'world',
            },
          },
        },
        handler: async (request, reply): Promise<void> => {
          return
        },
      });
    };


    const server = fastify()
    .addHook('onRoute', assertsValidationSchemaPresenceHook)
    .register(route)

    await chai.expect(server).to.eventually.be.rejected.and.deep.include({
      message: 'Validation schema not found'
    });
  })
})

describe('setErrorHandler', function() {
  it('should return a standarlized response', async () => {
    const response = await server.inject({
      method: "GET",
      url: "/web-api/users/1"
    })

    expect(response.statusCode).to.equal(500)
    expect(response.statusMessage).to.equal('Internal Server Error')
  })
})

// describe('Error handler', () => {
//   it('handles a ValidationError', async () => {
//     const payload = {
//       firstname: 'Hoang111',
//       email: 'hoang111@gmail.com',
//       password: '12345',
//       passwordConfirmation: '12345'
//     }    
//     const response = await server.inject({
//       method: 'POST',
//       url: '/web-api/users',
//       payload: {
//         payload
//       },
//     });

//     expect(response.statusCode).to.equal(404);
    
//   });
// });