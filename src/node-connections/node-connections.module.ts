import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeConnectionsService } from './node-connections.service';
import { NodeConnectionsController } from './node-connections.controller';
import { NodeConnection } from './entities/node-connection.entity';
import {AuthModule} from "../auth/auth.module";
import {FirebaseAuthGuard} from "../auth/firebase-auth.guard";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([NodeConnection]),  AuthModule, UsersModule,],
    providers: [NodeConnectionsService, FirebaseAuthGuard],
    controllers: [NodeConnectionsController],
})
export class NodeConnectionsModule {}
