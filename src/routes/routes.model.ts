import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Routes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  user_id: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  publicity: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
