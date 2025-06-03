import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards, BadRequestException,
} from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dtos/create-node.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

console.log('✅ NodesController підключено');



// @ApiBearerAuth('access-token')
// @UseGuards(FirebaseAuthGuard)
@Controller('nodes')
export class NodesController {
    constructor(private readonly nodesService: NodesService) {}



    @Post()
    create(@Body() dto: CreateNodeDto) {
        return this.nodesService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: CreateNodeDto) {
        return this.nodesService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.nodesService.remove(+id);
    }


    @Get('graph')
    async getGraph() {
        console.log('➡️ Вхід в getGraph');

        try {
            console.log("try { ---------------");
            return await this.nodesService.getGraph();
        } catch (error) {

            console.log("catch (error) { ---------------");
            console.warn('⚠️ Помилка при побудові графа:', error);
            return { nodes: [], edges: [] }; // або null
        }
    }



    @Get()
    findAll() {
        return this.nodesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId)) {
            throw new BadRequestException(`Некоректний ID: ${id}`);
        }
        return this.nodesService.findOne(numericId);
    }


}
