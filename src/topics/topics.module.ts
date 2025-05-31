import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { Topic } from './entities/topic.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Topic])],
    controllers: [TopicsController],
    providers: [TopicsService],
})
export class TopicsModule {}
