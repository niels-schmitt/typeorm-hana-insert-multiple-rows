import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>
  ) {}

  async getPhotos(): Promise<Photo[]> {
    const result = await this.photoRepository.createQueryBuilder().getMany();
    return result;
  }

  async insertPhotos(names: string[]): Promise<Photo[]> {
    const photos = names.map((name) => ({ name }));
    const result = await this.photoRepository.manager.insert(Photo, photos);
    return result.generatedMaps as Photo[];
  }

  async insertPhotosByQueryBuilder(names: string[]): Promise<Photo[]> {
    const photos = names.map((name) => ({ name }));
    // log SQL
    console.log(
      this.photoRepository
        .createQueryBuilder()
        .insert()
        .into(Photo)
        .values(photos)
        .getSql()
    );
    const result = await this.photoRepository
      .createQueryBuilder()
      .insert()
      .into(Photo)
      .values(photos)
      .execute();
    return result.generatedMaps as Photo[];
  }
}
