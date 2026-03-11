import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class FriendEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'friend_id' })
  public friend: UserEntity;

  @Column()
  public status: string;

  @Column({ nullable: true })
  public friend_at: Date;

  @CreateDateColumn()
  public created_at: Date;
}
