"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const create_users_table_1 = require("./create-users-table");
const topic_entity_1 = require("../topics/entities/topic.entity");
const node_entity_1 = require("../nodes/entities/node.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function initDb() {
    try {
        await data_source_1.AppDataSource.initialize();
        await (0, create_users_table_1.CreateUsersTable)();
        const topicRepo = data_source_1.AppDataSource.getRepository(topic_entity_1.Topic);
        const nodeRepo = data_source_1.AppDataSource.getRepository(node_entity_1.Node);
        const filePath = path.join(__dirname, '../seeds/topics.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const topicData = JSON.parse(raw);
        let createdTopics = 0;
        let createdNodes = 0;
        console.log(`✅ Topics created: ${createdTopics}`);
        console.log(`✅ Nodes created: ${createdNodes}`);
        console.log('🎉 База успішно ініціалізована');
        process.exit(0);
    }
    catch (e) {
        console.error('❌ Init error:', e);
        process.exit(1);
    }
}
initDb();
//# sourceMappingURL=init-db.js.map