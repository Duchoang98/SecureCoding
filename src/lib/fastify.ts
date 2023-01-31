// import fastify
import fastify, { FastifyReply, FastifyRequest, RouteOptions } from "fastify";

// import AppDataSource
import { AppDataSource } from "./typeorm";

// import User
import { User } from "../entities/User";

//import the generated interfaces
import { CreateUserRequestBody as CreateUserRequestBodyInterFace} from "../types/createUserRequestBody";
import { CreateUserResponseBody as CreateUserResponseBodyInterFace} from "../types/createUserResponseBody";

// import json files
import createUserRequestBody  from "../schemas/createUserRequestBody.json";
import createUserResponseBody  from "../schemas/createUserResponseBody.json";

// import webApiRoutes
import { webApiRoutes } from "../routes/web-api/web-api-routes";

// import ajv
import Ajv from "ajv";
import fastifyAjv from "fastify";

// import variable environment 
import * as dotenv from "dotenv";


dotenv.config({ path: "../../.env" });

const logger = process.env.FASTIFY_LOGGER;
const booleanLogger = logger === "true";



export const server = fastify({ logger: booleanLogger, ajv : {customOptions : {
  removeAdditional: false
},}})
  .addHook('onRoute', assertsResponseSchemaPresenceHook)
  .register(webApiRoutes, { prefix: '/web-api' })



server.post(
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

    console.log("before save", user);
    await repositoryUser.save(user);
    console.log("after save", user);

    const responseUser = new User();
    responseUser.id = user.id;
    responseUser.firstName = user.firstName;
    responseUser.lastName = user.lastName;
    responseUser.email = user.email;
    console.log("response user", responseUser);
    await reply.status(201).send(responseUser);
    await reply.status(201).send({ message: "User created successfully" });
  }
);

export function assertsResponseSchemaPresenceHook(routeOptions: RouteOptions) {
  if (!routeOptions.schema) {
    throw new Error("Response schema is not defined");
  }
}

