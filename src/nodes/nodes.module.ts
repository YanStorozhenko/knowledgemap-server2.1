import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';
import { Node } from './entities/node.entity';
import { Topic } from '../topics/entities/topic.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Node, Topic])],
    controllers: [NodesController],
    providers: [NodesService],
})
export class NodesModule {}
