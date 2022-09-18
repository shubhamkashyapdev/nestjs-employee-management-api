import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ProjectModule } from '../project/project.module';
import { LocationModule } from '../location/location.module';


@Module({
  imports: [TypeOrmModule.forFeature([Employee]), ProjectModule, LocationModule],
  providers: [EmployeeService, EmployeeResolver]
})
export class EmployeeModule { }
