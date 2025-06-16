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
const create_topics_table_1 = require("../migrations/create-topics-table");
const create_nodes_table_1 = require("../migrations/create-nodes-table");
const topic_entity_1 = require("../topics/entities/topic.entity");
const node_entity_1 = require("../nodes/entities/node.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function initTopics() {
    try {
        await data_source_1.AppDataSource.initialize();
        await (0, create_topics_table_1.CreateTopicsTable)();
        await (0, create_nodes_table_1.CreateNodesTable)();
        const topicRepo = data_source_1.AppDataSource.getRepository(topic_entity_1.Topic);
        const nodeRepo = data_source_1.AppDataSource.getRepository(node_entity_1.Node);
        const filePath = path.join(__dirname, '../seeds/topics.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const topicData = JSON.parse(raw);
        let createdTopics = 0;
        let createdNodes = 0;
        for (const data of topicData) {
            const exists = await topicRepo.findOneBy({ title: data.title });
            if (!exists) {
                const topic = topicRepo.create(data);
                await topicRepo.save(topic);
                createdTopics++;
            }
        }
        const allTopics = await topicRepo.find();
        for (const topic of allTopics) {
            const existingNode = await nodeRepo.findOne({ where: { topicId: topic.id } });
            if (!existingNode) {
                const node = nodeRepo.create({
                    title: topic.title,
                    topicId: topic.id,
                });
                await nodeRepo.save(node);
                createdNodes++;
            }
        }
        console.log(`✅ Topics created: ${createdTopics}`);
        console.log(`✅ Nodes created: ${createdNodes}`);
        console.log('🎉 Topics and nodes initialized');
        process.exit(0);
    }
    catch (err) {
        console.error('❌ Error initializing topics:', err);
        process.exit(1);
    }
}
initTopics();
//# sourceMappingURL=init-topics.js.map