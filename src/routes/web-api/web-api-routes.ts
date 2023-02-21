import { FastifyInstance } from "fastify";

import { User } from "../../entities/User";
import { AppDataSource } from "../../lib/typeorm";

import createUserRequestBody from "../../schemas/createUserRequestBody.json";
import createUserResponseBody from "../../schemas/createUserResponseBody.json";

export async function webApiRoutes (fastify: FastifyInstance) {
  fastify.get<{ Params: { id: number } }>("/users/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
        required: ["id"],
      },
      response: {
        200: createUserResponseBody,
      },
    },
    handler: async (request, reply): Promise<void> => {
      try {
        const user = await AppDataSource.getRepository(User).findOneBy({
          id: request.params.id,
        });
        await reply.send(user);
      } catch (Error) {
        await reply.status(500).send(Error);
      }
    },
  });

  fastify.post(
    "/web-api/users",
    {
      schema: {
        body: createUserRequestBody,
        response: {
          201: createUserResponseBody,
        },
      },
    },
    async (request, reply): Promise<void> => {
      const repositoryUser = AppDataSource.getRepository(User);
      const user = new User();
  
      user.firstName = (request.body as any).firstname;
      user.lastName = (request.body as any).lastname;
      user.email = (request.body as any).email;
      user.passwordHash = (request.body as any).password;
  
      await repositoryUser.save(user);
    
      const responseUser = new User();
      responseUser.id = user.id;
      responseUser.firstName = user.firstName;
      responseUser.lastName = user.lastName;
      responseUser.email = user.email;
      
      await reply.status(201).send(responseUser);
      await reply.status(201).send({ message: "User created successfully" });
    }
  );
}




