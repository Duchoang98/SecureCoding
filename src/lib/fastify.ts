import fastify, { FastifyReply, FastifyRequest } from "fastify";

import {CreateUserResponseBody} from '../schemas/createUserResponseBody'
import {CreateUserRequestBody} from '../schemas/createUserRequestBody'
import { AppDataSource } from "./typeorm";
import { User } from "../entities/User";
import { FromSchema } from "json-schema-to-ts";


export const server = fastify()

server.get('/ping', async(request, reply) => {
    return 'pong\n'
})

server.post(
  '/web-api/users',
  {
    schema: {
      body: CreateUserRequestBody,
      response: {
        201: CreateUserResponseBody
      },
    }
  },
  async (request, reply): Promise<void> => {
    const repositoryUser = AppDataSource.getRepository(User);
    const user = new User()

    user.firstName = (request.body as any).firstname
    user.lastName = (request.body as any).lastname
    user.email = (request.body as any).email
    user.passwordHash = (request.body as any).password
    
    console.log('before save', user)
    await repositoryUser.save(user);  
    console.log('after save',user)

    const responseUser = new User()
    responseUser.id = user.id
    responseUser.firstName = user.firstName
    responseUser.lastName = user.lastName
    responseUser.email = user.email
    console.log('response user', responseUser)
    await reply.status(201).send(responseUser)
    await reply.status(201).send({message : 'User created successfully'})

  },
);


