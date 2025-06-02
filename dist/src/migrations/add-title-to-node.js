"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTitleToNode = void 0;
class AddTitleToNode {
    constructor() {
        this.name = 'AddTitleToNode';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE \`node\`
      ADD COLUMN \`title\` varchar(255) NOT NULL DEFAULT ''
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE \`node\` DROP COLUMN \`title\`
    `);
    }
}
exports.AddTitleToNode = AddTitleToNode;
//# sourceMappingURL=add-title-to-node.js.map