import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";
import { CoordinateDto } from "src/coordinates/dto/coordinate.dto";

@Exclude()
export class RouteDto {
  @ApiProperty({
    title: 'id маршрута',
    example: 1
  })
  @IsNumber()
  id: number

  @ApiProperty({
    title: 'Название маршрута',
    example: 'Маршрут по тропарево',
    minLength: 2,
    maxLength: 65
  })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty({
    title: 'Описание маршрута',
    example: 'Самый лучший маршрут на тропарево',
    minLength: 2,
    maxLength: 255
  })
  @IsString()
  @Expose()
  description: string;

  @ApiProperty({
    title: 'Id пользователя',
    example: '19a663ca-77e0-403c-b405-01d557d81b0d'
  })
  @IsString()
  @Expose()
  user_id: string;

  @ApiProperty({
    title: 'Статус маршрута',
    example: 'В процессе',
    nullable: true,
  })
  @IsString()
  status: string;

  @ApiProperty({
    title: 'Публичность маршрута',
    example: 'FRIENDS_ONLY',
    nullable: true,
  })
  @IsString()
  publicity: string;

  coordinates: CoordinateDto[]

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