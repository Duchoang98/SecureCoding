// import fastify
import fastify, { RouteOptions } from "fastify";

// import AppDataSource
import { AppDataSource } from "./typeorm";

// import User
import { User } from "../entities/User";


// import json files
import createUserRequestBody  from "../schemas/createUserRequestBody.json";
import createUserResponseBody  from "../schemas/createUserResponseBody.json";

// import webApiRoutes
import { webApiRoutes } from "../routes/web-api/web-api-routes";

// import variable environment 
import * as dotenv from "dotenv";

// import ValidationError and EntityNotFoundError
import { ValidationError } from "class-validator";
import { EntityNotFoundError } from "typeorm";


dotenv.config({ path: "../../.env" });

const logger = process.env.FASTIFY_LOGGER;
const booleanLogger = logger === "true";

export const server = fastify({ logger: booleanLogger, ajv : {customOptions : {
  removeAdditional: false
},}})
  .addHook('onRoute', assertsResponseSchemaPresenceHook)
  .register(webApiRoutes, { prefix: '/web-api' })

server.setErrorHandler((error, request, reply) => {
  if (error instanceof ValidationError) {
    reply.status(400).send({ error: error.message });
  } else if (error instanceof EntityNotFoundError) {
    reply.status(404).send({ error: 'Entity not found' });
  } else {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
});



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

export function assertsResponseSchemaPresenceHook(routeOptions: RouteOptions) {
  if (!routeOptions.schema?.response) {
    throw new Error("Response schema is not defined");
  }
}

export function assertsValidationSchemaPresenceHook (routeOptions: RouteOptions) {
  if (!routeOptions.schema?.body || routeOptions.schema.querystring || routeOptions.schema.params) {
    throw new Error("Validation schema not found")
  }
}



