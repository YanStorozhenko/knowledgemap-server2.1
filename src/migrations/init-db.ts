import { exec } from 'child_process';
import path from 'path';

const scripts = [
   // 'src/migrations/init-topics.ts',
    'src/migrations/init-node-connections.ts',
    // 'src/migrations/init-users.ts',
     'src/migrations/init-user-topic-progress.ts'
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
        console.log('🎉 Уся база ініціалізована успішно');
        process.exit(0);
    } catch (e) {
        console.error('❌ Помилка при ініціалізації бази:', e);
        process.exit(1);
    }
}

initDb();
