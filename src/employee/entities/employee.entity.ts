import { Field, ObjectType } from "@nestjs/graphql";
import { Project } from "../../project/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Employee {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    // @PrimaryColumn() - to set the id value manually
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

    @Column()
    @Field()
    projectId: string;
}