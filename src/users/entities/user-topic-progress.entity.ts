import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Topic } from '../../topics/entities/topic.entity';

@Entity('user_topic_progress')
export class UserTopicProgress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_uid', type: 'varchar' })
    userUid: string;

    @ManyToOne(() => Topic)
    @JoinColumn({ name: 'topic_id' })
    topicId: number;

    @Column({ default: 'not-started' })
    status: string;

    @Column({ type: 'float', default: 0 })
    progress: number;

    @Column({ type: 'timestamp', nullable: true })
    completed_at: Date | null;
}
