"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_user_topic_progress_table_1 = require("./create-user-topic-progress-table");
const data_source_1 = require("../data-source");
const { exec } = require('child_process');
const path = require('path');
const scripts = [
    'src/migrations/create-user-topic-progress-table.ts',
];
async function runScript(scriptPath) {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(scriptPath);
        console.log(`▶️ Запуск: ${fullPath}`);
        exec(`npx ts-node ${fullPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Помилка у ${scriptPath}:\n`, stderr);
                reject(error);
                return;
            }
            console.log(stdout);
            resolve();
        });
    });
}
async function initDb() {
    try {
        for (const script of scripts) {
            await runScript(script);
        }
        await data_source_1.AppDataSource.initialize();
        await (0, create_user_topic_progress_table_1.CreateUserTopicProgressTable)();
        console.log('🎉 Уся база ініціалізована успішно');
        process.exit(0);
    }
    catch (e) {
        console.error('❌ Помилка при ініціалізації бази:', e);
        process.exit(1);
    }
}
initDb();
//# sourceMappingURL=init-db.js.map