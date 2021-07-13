import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Photo } from './photo.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Photo]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        switch (configService.get('DB_TYPE')) {
          case 'sap':
            console.log('Connecting to HANA...');
            return {
              type: 'sap',
              host: configService.get('HANA_HOST'),
              port: configService.get('HANA_PORT'),
              username: configService.get('HANA_USER'),
              password: configService.get('HANA_PASSWORD'),
              schema: configService.get('HANA_SCHEMA'),
              entities: [Photo],
              synchronize: true,
              encrypt: true,
              sslValidateCertificate: false,
            };
          case 'postgres':
            console.log('Connecting to Postgres...');
            return {
              type: 'postgres',
              host: configService.get('POSTGRES_HOST'),
              port: configService.get('POSTGRES_PORT'),
              username: configService.get('POSTGRES_USER'),
              password: configService.get('POSTGRES_PASSWORD'),
              schema: configService.get('POSTGRES_SCHEMA'),
              entities: [Photo],
              synchronize: true,
            };
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
