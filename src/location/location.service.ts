import { Injectable } from '@nestjs/common';
import { ObjectType } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationCreateDTO } from './dto/create.location.input';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
    constructor(@InjectRepository(Location) private locationRepository: Repository<Location>) { }
    findAll(): Promise<Location[]> {
        return this.locationRepository.find({
            relations: ["employees"]
        });
    }

    findOne(id: string): Promise<Location> {
        return this.locationRepository.findOne({ where: { id: id }, relations: ["employees"] });
    }

    create(location: LocationCreateDTO): Promise<Location> {
        return this.locationRepository.save(location);
    }
}
