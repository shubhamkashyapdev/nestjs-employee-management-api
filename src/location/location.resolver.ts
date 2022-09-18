import { Args, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { LocationCreateDTO } from './dto/create.location.input';
import { Location } from './entities/location.entity';
import { LocationService } from './location.service';


@Resolver(() => Location)
export class LocationResolver {

    constructor(private locationService: LocationService) { }

    @Query(() => [Location], { name: "getAllLocation" })
    findAll(): Promise<Location[]> {
        return this.locationService.findAll()
    }

    @Query(() => Location, { name: "findLocationById" })
    findOne(@Args('id') id: string): Promise<Location> {
        return this.locationService.findOne(id)
    }

    @Mutation(() => Location, { name: "createLocation" })
    create(@Args('location') location: LocationCreateDTO): Promise<Location> {
        return this.locationService.create(location)
    }
}
