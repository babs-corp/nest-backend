import { Module } from '@nestjs/common';
import { CoordinatesController } from './coordinates.controller';
import { CoordinatesService } from './coordinates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinates } from './coordinates.model';

@Module({
  imports: [TypeOrmModule.forFeature([Coordinates])],
  controllers: [CoordinatesController],
  providers: [CoordinatesService],
})
export class CoordinatesModule {}
