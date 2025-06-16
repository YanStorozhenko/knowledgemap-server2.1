import { Repository } from 'typeorm';
import { Node } from './entities/node.entity';
import { CreateNodeDto } from './dtos/create-node.dto';
import { UserTopicProgress } from '../users/entities/user-topic-progress.entity';
import { NodeConnection } from '../node-connections/entities/node-connection.entity';
type EdgeDto = {
    from: number;
    to: number;
    label?: string;
};
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
    getGraph(): Promise<{
        nodes: (Node & {
            level: number;
        })[];
        edges: EdgeDto[];
    }>;
    getGraphWithProgress(userUid: string): Promise<{
        progressStatus: "completed" | "available" | "locked";
        id: number;
        title: string;
        topicId: number;
        x: number;
        y: number;
        color: string;
    }[]>;
}
export {};
