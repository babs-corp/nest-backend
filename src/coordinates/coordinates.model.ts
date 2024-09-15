import { Routes } from 'src/routes/routes.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'Coordinates' })
export class Coordinates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => Routes)
  route_id: number;

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

  @Column()
  order: number;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}

