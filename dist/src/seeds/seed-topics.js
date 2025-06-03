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
const topic_entity_1 = require("../topics/entities/topic.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function seedTopics() {
    await data_source_1.AppDataSource.initialize();
    const repo = data_source_1.AppDataSource.getRepository(topic_entity_1.Topic);
    const filePath = path.join(__dirname, 'topics.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const topics = JSON.parse(rawData);
    for (const data of topics) {
        const exists = await repo.findOneBy({ title: data.title });
        if (!exists) {
            await repo.save(repo.create(data));
        }
    }
    console.log('✅ Topics seeded');
    process.exit(0);
}
seedTopics().catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
});
//# sourceMappingURL=seed-topics.js.map