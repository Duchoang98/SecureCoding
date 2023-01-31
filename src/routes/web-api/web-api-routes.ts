import { FastifyInstance } from "fastify";

import { User } from "../../entities/User";
import { AppDataSource } from "../../lib/typeorm";

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
};




