import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Routes } from './routes.model';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Routes)
    private routeRepository: Repository<Routes>
  ) {}

  async findAll(): Promise<Routes[]> {
    return this.routeRepository.find();
  }

  async getById(id: number): Promise<Routes> {
    const route = this.routeRepository.findOne({ where: { id } });
    if(!route) { 
      throw new NotFoundException();
    }
    return route;
  }

  async create(route: Partial<Routes>): Promise<Routes> {
    const newRoute = this.routeRepository.create(route);
    if(!newRoute) {
      throw new BadRequestException();
    }
    return this.routeRepository.save(newRoute);
  }

  async update(id: number, user: Partial<Routes>): Promise<Routes> {
    await this.routeRepository.update(id, user);
    return this.routeRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.routeRepository.delete(id);
  }
}
