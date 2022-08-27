import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { EmployeeCreateDTO } from './dto/create.employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
    constructor(private employeeService: EmployeeService) { }

    @Query(() => [Employee], { name: 'getAllEmployees' })
    findAll() {
        return this.employeeService.findAll();
    }

    @Mutation(() => Employee, { name: 'createEmployee' })
    create(@Args('employeeInput') employee: EmployeeCreateDTO) {
        this.employeeService.create(employee)
    }
}
