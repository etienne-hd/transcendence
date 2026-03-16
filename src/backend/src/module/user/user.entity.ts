import {
  USER_BIOGRAPHY_MAX_LENGTH,
  USER_EMAIL_MAX_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_USERNAME_MAX_LENGTH,
} from 'src/common/constants/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public last_seen_at: Date;

  @Column({ length: USER_USERNAME_MAX_LENGTH })
  public username: string;

  @Column({ length: USER_NAME_MAX_LENGTH })
  public name: string;

  @Column({ length: USER_EMAIL_MAX_LENGTH })
  public email: string;

  @Column({ length: USER_PASSWORD_MAX_LENGTH })
  public password: string;

  @Column({ nullable: true, length: USER_BIOGRAPHY_MAX_LENGTH })
  public biography: string;

  @Column({ type: 'varchar', nullable: true })
  public avatar: string | null;

  @Column()
  public is_banned: boolean = false;

  @Column()
  public warn: number = 0;

  @Column({ default: 'offline' })
  public status: string;
}
