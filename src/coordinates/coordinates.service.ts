import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coordinates } from './coordinates.model';
import { RoutesService } from '../routes/routes.service';

@Injectable()
export class CoordinatesService {
  constructor(
    @Inject() private routeService: RoutesService,
    @InjectRepository(Coordinates)
    private coordinatesRepository: Repository<Coordinates>
  ) {}

  async findAll(): Promise<Coordinates[]> {
    return this.coordinatesRepository.find();
  }

  async getById(id: number): Promise<Coordinates> {
    const coordinate = this.coordinatesRepository.findOne({ where: { id } });
    if(!coordinate) { 
      throw new NotFoundException();
    }
    return coordinate;
  }

  async create(coordinate: Partial<Coordinates>): Promise<Coordinates> {
    if (!coordinate.order) {
      coordinate.order = await this.calculateNewCoordinateOrder(coordinate.routeId);
    }

    const newCoordinate = this.coordinatesRepository.create(coordinate);
    if(!newCoordinate) {
      throw new BadRequestException();
    }

    const createdCoordinate = await this.coordinatesRepository.save(newCoordinate);

    return createdCoordinate;
  }

  async update(id: number, coordinate: Partial<Coordinates>): Promise<Coordinates> {
    await this.coordinatesRepository.update(id, coordinate);
    return this.coordinatesRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.coordinatesRepository.delete(id);
  }

  private async calculateNewCoordinateOrder(routeId: number) {
    const route = await this.routeService.getById(routeId);
    if(route.coordinates.length === 0) {
      return 1;
    }

    return route.coordinates.sort(
      (coord1, coord2) => coord2.order - coord1.order
    )[0].order + 1
  }
}
