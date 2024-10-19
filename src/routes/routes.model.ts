import { Coordinates } from 'src/coordinates/coordinates.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'Routes' })
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

  @OneToMany(() => Coordinates, (coordinates) => coordinates.route, { eager: true })
  coordinates: Coordinates[]

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
