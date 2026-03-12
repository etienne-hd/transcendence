import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

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

  @Column({ nullable: true })
  public content: string;

  @Column({ nullable: true })
  public attachment: string;

  @CreateDateColumn()
  public created_at: Date;

  @Column({ nullable: true })
  public read_at: Date;
}
