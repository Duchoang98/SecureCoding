import "reflect-metadata"
import { AppDataSource } from "./lib/typeorm"
// import { FASTIFY_ADDR, FASTIFY_PORT } from '../.env'
import { server } from './lib/fastify'
import * as dotenv from 'dotenv'

dotenv.config()

async function run() {
  await AppDataSource.initialize()
  await server.listen({port: 8080}, (err, address) => {
    if(err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listen at ${address}`)
})
}

run().catch(console.error)



