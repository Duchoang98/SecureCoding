// import fastify from "fastify";
// import { expect } from "chai";


// import { AppDataSource } from "../../../lib/typeorm";
// import { assertsResponseSchemaPresenceHook, server } from '../../../lib/fastify'


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

// describe('assertResponseSchemaPresenceHook',function () {
//   it("throw an error if an unsafe route is registered", async function() {
//     const server = fastify()
//     server.addHook("onRoute", assertsResponseSchemaPresenceHook)

//     server.get('/users', {}, () => {})

//     expect(() => {
//       server.ready()
//     }).to.Throw('Error')
//   })
// })