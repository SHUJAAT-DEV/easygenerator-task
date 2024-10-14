import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { getLoggerConfig } from './config/logger.config';
import { WinstonModule } from 'nest-winston'; // Ensure you're importing WinstonModule from nest-winston

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      load: [configuration],
    }),

    WinstonModule.forRootAsync({
      useFactory: getLoggerConfig,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database.uri'),
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(`Loaded Environment: ${process.env.NODE_ENV}`);
    console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);
  }
}
