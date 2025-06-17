import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dtos/create-node.dto';
export declare class NodesController {
    private readonly nodesService;
    constructor(nodesService: NodesService);
    create(dto: CreateNodeDto): Promise<import("./entities/node.entity").Node>;
    update(id: string, dto: CreateNodeDto): Promise<import("./entities/node.entity").Node>;
    remove(id: string): Promise<void>;
    getGraph(req: any): Promise<{
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
    findAll(): Promise<import("./entities/node.entity").Node[]>;
    findOne(id: string): Promise<import("./entities/node.entity").Node>;
}
