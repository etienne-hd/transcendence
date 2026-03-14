import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { MESSAGE_CONTENT_MAX_LENGTH } from 'src/common/constants/constants';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'from_user_id' })
  public from_user: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'to_user_id' })
  public to_user: UserEntity;

  @Column({ nullable: true, length: MESSAGE_CONTENT_MAX_LENGTH })
  public content: string;

  @Column({ type: 'varchar', nullable: true })
  public attachment: string | null;

  @CreateDateColumn()
  public created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  public read_at: Date | null;
}
