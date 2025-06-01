"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
require("dotenv/config");
const user_entity_1 = require("./users/entities/user.entity");
const topic_entity_1 = require("./topics/entities/topic.entity");
const node_entity_1 = require("./nodes/entities/node.entity");
const node_connection_entity_1 = require("./node-connections/entities/node-connection.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        user_entity_1.User,
        topic_entity_1.Topic,
        node_entity_1.Node,
        node_connection_entity_1.NodeConnection
    ],
    migrations: [],
    synchronize: false,
    logging: true,
});
//# sourceMappingURL=data-source.js.map