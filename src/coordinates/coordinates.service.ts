import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coordinates } from './coordinates.model';

@Injectable()
export class CoordinatesService {
  constructor(
    @InjectRepository(Coordinates)
    private coordinatesRepository: Repository<Coordinates>
  ) {}

  async findAll(): Promise<Coordinates[]> {
    return this.coordinatesRepository.find();
  }

  async getById(id: number): Promise<Coordinates> {
    const route = this.coordinatesRepository.findOne({ where: { id } });
    if(!route) { 
      throw new NotFoundException();
    }
    return route;
  }

  async create(route: Partial<Coordinates>): Promise<Coordinates> {
    const newRoute = this.coordinatesRepository.create(route);
    if(!newRoute) {
      throw new BadRequestException();
    }
    return this.coordinatesRepository.save(newRoute);
  }

  async update(id: number, user: Partial<Coordinates>): Promise<Coordinates> {
    await this.coordinatesRepository.update(id, user);
    return this.coordinatesRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.coordinatesRepository.delete(id);
  }
}
