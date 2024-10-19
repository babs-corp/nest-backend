import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsDate, IsDecimal, IsNumber, IsOptional } from "class-validator";

@Exclude()
export class CoordinateDto {
  @ApiProperty({
    title: 'id маршрута',
    example: 1
  })
  @IsNumber()
  id: number

  @ApiProperty({
    title: 'Id маршрута',
    example: 1,
    minLength: 1,
    maxLength: 15
  })
  @IsNumber()
  @Expose()
  routeId: number;

  @ApiProperty({
    title: 'Широта точки',
    example: 55.75972,
    minLength: 2,
    maxLength: 15
  })
  @IsDecimal()
  @Expose()
  latitude: number;

  @ApiProperty({
    title: 'Долгота точки',
    example: 37.61777,
    minLength: 2,
    maxLength: 15
  })
  @IsDecimal()
  @Expose()
  longitude: number;

  @ApiProperty({
    title: 'Порядок точки в маршруте',
    example: 1
  })
  @IsNumber()
  @IsOptional()
  order: number;

  @ApiProperty({
    title: 'Дата создания маршрута'
  })
  @IsDate()
  created_at: Date;

  @ApiProperty({
    title: 'Дата изменения маршрута'
  })
  @IsDate()
  updated_at: Date;
}