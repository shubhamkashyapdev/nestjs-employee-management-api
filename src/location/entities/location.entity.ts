import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "../../employee/entities/employee.entity";

@ObjectType()
@Entity()
export class Location {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Field()
    @Column()
    name: string;
    @Field({ nullable: true })
    @Column({ nullable: true })
    longitude: string;
    @Field({ nullable: true })
    @Column({ nullable: true })
    latitude: string;

    @OneToMany(() => Employee, employee => employee.location)
    @Field(() => [Employee])
    employees: Employee[];
}