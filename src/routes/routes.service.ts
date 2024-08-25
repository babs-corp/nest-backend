import { Injectable } from '@nestjs/common';
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
    return this.movieRepository.findOne({ where: { id } });
  }

  async create(user: Partial<Routes>): Promise<Routes> {
    const newuser = this.movieRepository.create(user);
    return this.movieRepository.save(newuser);
  }

  async update(id: number, user: Partial<Routes>): Promise<Routes> {
    await this.movieRepository.update(id, user);
    return this.movieRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
