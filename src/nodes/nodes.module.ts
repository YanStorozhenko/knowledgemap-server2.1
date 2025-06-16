import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';
import { Node } from './entities/node.entity';
import { Topic } from '../topics/entities/topic.entity';
import { NodeConnection } from '../node-connections/entities/node-connection.entity';
import { UserTopicProgress } from '../users/entities/user-topic-progress.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Node,
            Topic,
            NodeConnection,
            UserTopicProgress,
        ]),
    ],
    controllers: [NodesController],
    providers: [NodesService],
})
export class NodesModule {}
