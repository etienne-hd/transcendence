import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public created_at: Date = new Date();

  @Column()
  public last_seen_at: Date = new Date();

  @Column()
  public username: string;

  @Column()
  public name: string;

  @Column()
  public biography: string = '';

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public avatar: string = '';

  @Column()
  public is_banned: boolean = false;

  @Column()
  public warn: number = 0;
}
