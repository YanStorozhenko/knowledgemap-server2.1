import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('node_connections')
export class NodeConnection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'from_node_id' })
    fromNodeId: number;

    @Column({ name: 'to_node_id' })
    toNodeId: number;

    @Column({ nullable: true })
    type: string;
}
