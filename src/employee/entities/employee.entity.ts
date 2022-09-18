import { Field, ObjectType } from "@nestjs/graphql";
import { Project } from "../../project/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../../location/entities/location.entity";

@ObjectType()
@Entity()
export class Employee {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Field()
    @Column()
    firstName: string;
    @Column()
    @Field()
    lastName: string;
    @Field()
    @Column()
    designation: string;
    @Field({ nullable: true })
    @Column({ nullable: true })
    city?: string;

    @ManyToOne(() => Project, project => project.employees)
    @Field(() => Project)
    project: Project;

    @ManyToOne(() => Location, location => location.employees)
    @Field(() => Location)
    location: Location;

    @Column()
    @Field()
    projectId: string;

    @Field()
    @Column()
    locationId: string;

}