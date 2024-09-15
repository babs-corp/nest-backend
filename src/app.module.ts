import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RoutesModule } from './routes/routes.module';
import { CoordinatesModule } from './coordinates/coordinates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    RoutesModule,
    CoordinatesModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
