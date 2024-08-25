import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Routes } from './routes.model';

@Controller('routes')
export class RoutesController {
  constructor(private readonly moviesService: RoutesService) {}

  @Get()
  async findAll(): Promise<Routes[]> {
    return this.moviesService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() route: Partial<Routes>
  ): Promise<Routes> {
    const createdRoute = await this.moviesService.create(route);
    return createdRoute;
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<any> {
    const route = await this.moviesService.getById(id);
    return route;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const route = await this.moviesService.getById(id);

    if (!route) {
      throw new NotFoundException('Route does not exist!');
    }

    await this.moviesService.delete(id);
    return { message: 'Route deleted successfully' };
  }
}
  