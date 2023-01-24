// import { FastifyInstance, RouteOptions } from "fastify";
// import { resolve } from "path";
// import { User } from "../../entities/User";
// import { AppDataSource } from "../../lib/typeorm";
// import { CreateUserRequestBody } from "../../schemas/createUserRequestBody";
// import { CreateUserResponseBody } from "../../schemas/createUserResponseBody";

// export async function webApiRoutes (fastify: FastifyInstance) {
//   fastify.get<{ Params: { id: number } }>("/users/:id", {
//     schema: {
//       params: {
//         type: "object",
//         properties: {
//           id: { type: "number" },
//         },
//         required: ["id"],
//       },
//       response: {
//         200: CreateUserResponseBody,
//       },
//     },
//     handler: async (request, reply): Promise<void> => {
//       try {
//         const user = await AppDataSource.getRepository(User).findOneBy({
//           id: request.params.id,
//         });
//         await reply.send(user);
//       } catch (Error) {
//         await reply.status(500).send(Error);
//       }
//     },
//   });
// };
// // // export const createSessionRequestBody = 
// // export const CreateUserRequestBody = 
// // export const CreateUserResponseBody = 



