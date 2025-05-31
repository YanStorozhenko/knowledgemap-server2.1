import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from './users/entities/user.entity';
import { Topic } from './topics/entities/topic.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Topic], //  всі ентіті тут
        migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
    logging: true,
});
