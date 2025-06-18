import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';
import { Node } from './entities/node.entity';
import { Topic } from '../topics/entities/topic.entity';
import { NodeConnection } from '../node-connections/entities/node-connection.entity';
import { UserTopicProgress } from '../users/entities/user-topic-progress.entity';
import {UsersModule} from "../users/users.module";
import {FirebaseAuthGuard} from "../auth/firebase-auth.guard";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Node,
            Topic,
            NodeConnection,
            UserTopicProgress,
        ]),
        UsersModule,
        AuthModule,
    ],
    controllers: [NodesController],
    providers: [NodesService, FirebaseAuthGuard],
})
export class NodesModule {}
