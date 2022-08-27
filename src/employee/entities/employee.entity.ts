import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
}