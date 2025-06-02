import { NodeConnectionsService } from './node-connections.service';
import { CreateNodeConnectionDto } from './dto/create-node-connection.dto';
export declare class NodeConnectionsController {
    private readonly service;
    constructor(service: NodeConnectionsService);
    findAll(): Promise<import("./entities/node-connection.entity").NodeConnection[]>;
    findOne(id: string): Promise<import("./entities/node-connection.entity").NodeConnection>;
    create(dto: CreateNodeConnectionDto): Promise<import("./entities/node-connection.entity").NodeConnection>;
    update(id: string, dto: CreateNodeConnectionDto): Promise<import("./entities/node-connection.entity").NodeConnection>;
    remove(id: string): Promise<void>;
}
