import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Routes } from './routes.model';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Routes)
    private movieRepository: Repository<Routes>
  ) {}

  async findAll(): Promise<Routes[]> {
    return this.movieRepository.find();
  }

  async getById(id: number): Promise<Routes> {
    const route = this.movieRepository.findOne({ where: { id } });
    if(!route) { 
      throw new NotFoundException();
    }
    return route;
  }

  async create(route: Partial<Routes>): Promise<Routes> {
    const newRoute = this.movieRepository.create(route);
    if(!newRoute) {
      throw new BadRequestException();
    }
    return this.movieRepository.save(newRoute);
  }

  async update(id: number, user: Partial<Routes>): Promise<Routes> {
    await this.movieRepository.update(id, user);
    return this.movieRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
