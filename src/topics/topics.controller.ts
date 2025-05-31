import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';

@Controller('topics')
export class TopicsController {
    constructor(private readonly topicsService: TopicsService) {}

    @Get()
    findAll() {
        return this.topicsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.topicsService.findOne(id);
    }

    @Post()
    create(@Body() createTopicDto: CreateTopicDto) {
        return this.topicsService.create(createTopicDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateTopicDto: UpdateTopicDto) {
        return this.topicsService.update(id, updateTopicDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.topicsService.remove(id);
    }
}
