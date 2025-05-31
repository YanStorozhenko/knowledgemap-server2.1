import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Node } from '../../nodes/entities/node.entity';

@Entity()
export class NodeConnection {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Node, { onDelete: 'CASCADE' })
    fromNode: Node;

    @ManyToOne(() => Node, { onDelete: 'CASCADE' })
    toNode: Node;
}
