import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from './users/entities/user.entity';
import { Topic } from './topics/entities/topic.entity';
import { Node } from './nodes/entities/node.entity';
import { NodeConnection } from './node-connections/entities/node-connection.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        User,
        Topic,
        Node,
        NodeConnection

    ], //  всі ентіті тут

         migrations: [],
    synchronize: false,
    logging: true,
});
