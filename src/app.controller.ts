import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Photo } from './photo.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/photos')
  async getPhotos(): Promise<Photo[]> {
    return this.appService.getPhotos();
  }

  @Post('/photos')
  async postPhotos(@Body() names: string[]): Promise<Photo[]> {
    return this.appService.insertPhotos(names);
  }

  @Post('/photosByQueryBuilder')
  async postPhotosByQueryBuilder(@Body() names: string[]): Promise<Photo[]> {
    return this.appService.insertPhotosByQueryBuilder(names);
  }
}
