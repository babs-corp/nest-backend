import { Routes } from 'src/routes/routes.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';

@Entity({ name: 'Coordinates' })
@Unique(["routeId", "order"])
export class Coordinates {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Routes, route => route.coordinates)
  route: Routes;

  @Column()
  routeId: number;

  @Column({ 
    type: 'decimal', 
    precision: 9, 
    scale: 6 
  })
  latitude: number;

  @Column({ 
    type: 'decimal', 
    precision: 8, 
    scale: 6
  })
  longitude: number;

  @Column({
    nullable: false,
  })
  order: number;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}

