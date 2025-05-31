import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {Topic} from "../../topics/entities/topic.entity";


@Entity()
export class Node {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Topic, { eager: true })
    @JoinColumn({ name: 'topic_id' })
    topic: Topic;

    @Column({ type: 'float', nullable: true })
    x: number;

    @Column({ type: 'float', nullable: true })
    y: number;

    @Column({ nullable: true })
    color: string;
}
