import { Repository } from 'typeorm';
import { Node } from './entities/node.entity';
import { CreateNodeDto } from './dtos/create-node.dto';
import { UserTopicProgress } from '../users/entities/user-topic-progress.entity';
import { NodeConnection } from '../node-connections/entities/node-connection.entity';
export declare class NodesService {
    private readonly nodeRepo;
    private progressRepo;
    private readonly connectionRepo;
    constructor(nodeRepo: Repository<Node>, progressRepo: Repository<UserTopicProgress>, connectionRepo: Repository<NodeConnection>);
    findAll(): Promise<Node[]>;
    findOne(id: number): Promise<Node>;
    create(dto: CreateNodeDto): Promise<Node>;
    update(id: number, dto: CreateNodeDto): Promise<Node>;
    remove(id: number): Promise<void>;
    getGraph(userUid: string): Promise<{
        nodes: {
            id: number;
            title: string;
            topicId: number;
            x: number;
            y: number;
            level: number;
            progress: number;
            status: "completed" | "available" | "locked";
        }[];
        edges: {
            from: number;
            to: number;
            label: string;
        }[];
    }>;
}
