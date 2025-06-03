import { Repository } from 'typeorm';
import { NodeConnection } from './entities/node-connection.entity';
import { CreateNodeConnectionDto } from './dto/create-node-connection.dto';
export declare class NodeConnectionsService {
    private readonly repo;
    constructor(repo: Repository<NodeConnection>);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<NodeConnection>;
    create(dto: CreateNodeConnectionDto): Promise<NodeConnection>;
    update(id: number, dto: CreateNodeConnectionDto): Promise<NodeConnection>;
    remove(id: number): Promise<void>;
}
