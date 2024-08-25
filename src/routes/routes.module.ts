import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routes } from './routes.model';

@Module({
  imports: [TypeOrmModule.forFeature([Routes])],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
