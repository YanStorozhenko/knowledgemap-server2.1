import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('nodes')
export class Node {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ name: 'topic_id' })
    topicId: number;

    @Column({ type: 'float', nullable: true })
    x: number;

    @Column({ type: 'float', nullable: true })
    y: number;

    @Column({ nullable: true })
    color: string;
}
