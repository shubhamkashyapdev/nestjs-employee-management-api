import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LocationCreateDTO {
    @Field()
    name: string;
    @Field({ nullable: true })
    longitude: string;
    @Field({ nullable: true })
    latitude: string;
}