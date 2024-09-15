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
import { CreateRouteDto } from './dto/create-route.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ROUTE_ERROR_SCHEMA, ROUTE_NOT_FOUND_ERROR_SCHEMA } from './swag/schemas';
import { OutRouteDto } from './dto/out-route.dto';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @ApiOperation({ summary: 'Получение всех маршрутов' })
  @Get()
  async findAll(): Promise<Routes[]> {
    return this.routesService.findAll();
  }

  @ApiOperation({ summary: 'Создание маршрута' })
  @ApiCreatedResponse({ description: 'Корректный ответ', type: OutRouteDto })
  @ApiBadRequestResponse({ description: 'Неправильный маршрут', schema: ROUTE_ERROR_SCHEMA })
  @Post()
  @HttpCode(201)
  async create(
    @Body() route: CreateRouteDto
  ): Promise<Routes> {
    const createdRoute = await this.routesService.create(route);
    return createdRoute;
  }

  @ApiOperation({ summary: 'Получение маршрута по id' })
  @ApiOkResponse({ type: OutRouteDto })
  @ApiNotFoundResponse({ description: 'Маршрут не найден', schema: ROUTE_NOT_FOUND_ERROR_SCHEMA })
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: number): Promise<OutRouteDto> {
    const route = await this.routesService.getById(id);
    return route;
  }

  @ApiOperation({ summary: 'Удаление маршрута по id' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const route = await this.routesService.getById(id);

    if (!route) {
      throw new NotFoundException('Route does not exist!');
    }

    await this.routesService.delete(id);
    return { message: 'Route deleted successfully' };
  }
}
  