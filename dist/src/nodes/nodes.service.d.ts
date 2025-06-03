import { Repository } from 'typeorm';
import { Node } from './entities/node.entity';
import { CreateNodeDto } from './dtos/create-node.dto';
import { NodeConnection } from '../node-connections/entities/node-connection.entity';
type EdgeDto = {
    from: number;
    to: number;
    label?: string;
};
export declare class NodesService {
    private readonly nodeRepo;
    private readonly connectionRepo;
    constructor(nodeRepo: Repository<Node>, connectionRepo: Repository<NodeConnection>);
    findAll(): Promise<Node[]>;
    findOne(id: number): Promise<Node>;
    create(dto: CreateNodeDto): Promise<Node>;
    update(id: number, dto: CreateNodeDto): Promise<Node>;
    remove(id: number): Promise<void>;
    getGraph(): Promise<{
        nodes: (Node & {
            level: number;
        })[];
        edges: EdgeDto[];
    }>;
}
export {};
