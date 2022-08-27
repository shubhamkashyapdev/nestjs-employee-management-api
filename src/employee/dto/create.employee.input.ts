import { Field, InputType } from "@nestjs/graphql";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class EmployeeCreateDTO {
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    designation: string;
    @Field({ nullable: true })
    city?: string;
}