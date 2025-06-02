import { Repository } from 'typeorm';
import { Node } from './entities/node.entity';
import { CreateNodeDto } from './dtos/create-node.dto';
export declare class NodesService {
    private readonly nodeRepo;
    constructor(nodeRepo: Repository<Node>);
    findAll(): Promise<Node[]>;
    findOne(id: number): Promise<Node>;
    create(dto: CreateNodeDto): Promise<Node>;
    update(id: number, dto: CreateNodeDto): Promise<Node>;
    remove(id: number): Promise<void>;
}
