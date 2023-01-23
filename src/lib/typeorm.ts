import {DataSource} from 'typeorm'
import {User} from '../entities/User'
import { UserSubscriber } from '../entities/UserSubcriber'


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "tutorial",
    password: "privatepassword",
    database: "iam",
    entities: [User],
    subscribers: [UserSubscriber],
    synchronize: true,
    logging: true,
})