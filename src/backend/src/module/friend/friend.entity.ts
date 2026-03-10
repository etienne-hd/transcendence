import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class FriendEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'id' })
  public from_user: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'id' })
  public to_user: UserEntity;

  @Column()
  public is_pending: boolean;

  @Column()
  public friend_at: Date;
}
