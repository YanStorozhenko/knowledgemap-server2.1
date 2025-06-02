import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dtos/create-node.dto';
export declare class NodesController {
    private readonly nodesService;
    constructor(nodesService: NodesService);
    findAll(): Promise<import("./entities/node.entity").Node[]>;
    findOne(id: string): Promise<import("./entities/node.entity").Node>;
    create(dto: CreateNodeDto): Promise<import("./entities/node.entity").Node>;
    update(id: string, dto: CreateNodeDto): Promise<import("./entities/node.entity").Node>;
    remove(id: string): Promise<void>;
}
