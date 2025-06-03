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
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dtos/create-node.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@UseGuards(FirebaseAuthGuard)
@Controller('nodes')
export class NodesController {
    constructor(private readonly nodesService: NodesService) {}

    @Get()
    findAll() {
        return this.nodesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.nodesService.findOne(+id);
    }

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
}
