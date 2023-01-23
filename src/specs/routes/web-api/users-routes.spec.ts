
import { expect } from "chai";
// import * as chaiAsPromised from "chai-as-promised";

import { AppDataSource } from "../../../lib/typeorm";
import { server } from '../../../lib/fastify'
import { stringify } from "querystring";
import { User } from "../../../entities/User";

// chai.use(chaiAsPromised);

describe('/web-api/users', function () {
  before(async function () {
    // TODO: initialise the datasource (database connection)
    await AppDataSource.initialize();
  });
  describe('POST #create', function () {
    it('should register the user', async function () {
      const payload = {
        firstname: 'Hoang34',
        lastname: 'Nguyen34',
        email: 'hoang34@gmail.com',
        password: '12345',
        passwordConfirmation: '12345'
      }

      const response = await server.inject({ url: `/web-api/users`, method: 'POST', payload: payload })
      console.log(response)
      expect(response.statusCode).to.equal(201)
      
    })
  })
})