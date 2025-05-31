import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dtos/create-node.dto';

@Controller('nodes')
export class NodesController {
    constructor(private readonly nodesService: NodesService) {}

    @Post()
    create(@Body() createNodeDto: CreateNodeDto) {
        return this.nodesService.create(createNodeDto);
    }

    @Get()
    findAll() {
        return this.nodesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.nodesService.findOne(+id);
    }
}
