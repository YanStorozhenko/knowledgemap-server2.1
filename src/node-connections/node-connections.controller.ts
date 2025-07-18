import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
} from '@nestjs/common';
import { NodeConnectionsService } from './node-connections.service';
import { CreateNodeConnectionDto } from './dto/create-node-connection.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

import { plainToInstance } from 'class-transformer';
import { NodeConnectionDto } from './dto/node-connection.dto';



@ApiBearerAuth('access-token')
@UseGuards(FirebaseAuthGuard)


@Controller('node-connections')
export class NodeConnectionsController {
    constructor(private readonly service: NodeConnectionsService) {}

    @Get()
    async findAll(): Promise<NodeConnectionDto[]> {
        const raw = await this.service.findAll();



        return plainToInstance(NodeConnectionDto, raw, { excludeExtraneousValues: true });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(+id);
    }

    @Post()
    create(@Body() dto: CreateNodeConnectionDto) {
        return this.service.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: CreateNodeConnectionDto) {
        return this.service.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
