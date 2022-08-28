import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EmployeeModule, GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
  }), TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    port: 5432,
    password: 'Postgres@pass123',
    database: 'employee',
    entities: [`dist/**/*.entity{.ts,.js}*`],
    synchronize: true, // only in dev environment
  }), ProjectModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
