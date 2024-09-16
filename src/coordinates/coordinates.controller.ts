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
import { CoordinatesService } from './coordinates.service';
import { Coordinates } from './coordinates.model';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ROUTE_ERROR_SCHEMA, ROUTE_NOT_FOUND_ERROR_SCHEMA } from './swag/schemas';
import { CreateCoordinateDto } from './dto/create-coordinate.dto';
import { OutCoordinateDto } from './dto/out-coordinate.dto';

@Controller('coordinates')
@ApiTags('Coordinates')
export class CoordinatesController {
  constructor(private readonly coordinatesService: CoordinatesService) {}

  @ApiOperation({ summary: 'Получение всех точек' })
  @Get()
  async findAll(): Promise<Coordinates[]> {
    return this.coordinatesService.findAll();
  }

  @ApiOperation({ summary: 'Создание точки' })
  @ApiCreatedResponse({ description: 'Корректный ответ', type: OutCoordinateDto })
  @ApiBadRequestResponse({ description: 'Неправильная точка', schema: ROUTE_ERROR_SCHEMA })
  @Post()
  @HttpCode(201)
  async create(
    @Body() route: CreateCoordinateDto
  ): Promise<Coordinates> {
    const createdRoute = await this.coordinatesService.create(route);
    return createdRoute;
  }

  @ApiOperation({ summary: 'Получение точки по id' })
  @ApiOkResponse({ type: OutCoordinateDto })
  @ApiNotFoundResponse({ description: 'Точка не найдена', schema: ROUTE_NOT_FOUND_ERROR_SCHEMA })
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: number): Promise<OutCoordinateDto> {
    const route = await this.coordinatesService.getById(id);
    return route;
  }

  @ApiOperation({ summary: 'Удаление точки по id' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const route = await this.coordinatesService.getById(id);

    if (!route) {
      throw new NotFoundException('Route does not exist!');
    }

    await this.coordinatesService.delete(id);
    return { message: 'Route deleted successfully' };
  }
}
  