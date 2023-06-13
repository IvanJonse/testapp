import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RequestsModule } from './requests/requests.module';
import configFile from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configFile]
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        RequestsModule
      ],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
      return config.get('database');
      },
    }),    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
