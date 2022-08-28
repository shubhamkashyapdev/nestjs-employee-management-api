import { ObjectType, Field, Int, ArrayElement } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column()
  role?: string;
  @Field()
  @Column()
  username: string;
  @Field()
  @Column()
  password: string;
}
