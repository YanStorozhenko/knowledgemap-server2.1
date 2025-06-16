import {seedNodeConnections} from "../seeds/seed-node-connections";
import {CreateUserTopicProgressTable} from "./create-user-topic-progress-table";
import {AppDataSource} from "../data-source";

const { exec } = require('child_process');
const path = require('path');

const scripts = [
   // 'src/migrations/init-topics.ts',
   // 'src/migrations/create-node-connections-table.ts',
        // 'src/migrations/init-users.ts',
     'src/migrations/create-user-topic-progress-table.ts',
  //  'src/seeds/seed-node-connections.ts'
];

async function runScript(scriptPath: string): Promise<void> {
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


        await AppDataSource.initialize();
        //await seedNodeConnections();
        await CreateUserTopicProgressTable();



        console.log('🎉 Уся база ініціалізована успішно');
        process.exit(0);
    } catch (e) {
        console.error('❌ Помилка при ініціалізації бази:', e);
        process.exit(1);
    }
}




initDb();
