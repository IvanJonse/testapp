import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RequestsModule } from './requests/requests.module';
import { UserModule } from './user/user.module';
import configFile from './config/app.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configFile]
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        AuthModule,
        UserModule,
        RequestsModule
      ],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
      return config.get('database');
      },
    }),
    UserModule,    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
