import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeConnectionsService } from './node-connections.service';
import { NodeConnectionsController } from './node-connections.controller';
import { NodeConnection } from './entities/node-connection.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NodeConnection])],
    providers: [NodeConnectionsService],
    controllers: [NodeConnectionsController],
})
export class NodeConnectionsModule {}
