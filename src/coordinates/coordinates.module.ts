import { Module } from '@nestjs/common';
import { CoordinatesController } from './coordinates.controller';
import { CoordinatesService } from './coordinates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinates } from './coordinates.model';
import { RoutesModule } from 'src/routes/routes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coordinates]), RoutesModule],
  controllers: [CoordinatesController],
  providers: [CoordinatesService],
})
export class CoordinatesModule {}
