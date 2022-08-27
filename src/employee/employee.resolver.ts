import { Args, Mutation, Parent, Query, ResolveField } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Project } from '../project/entities/project.entity';
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

    @ResolveField(() => Project)
    project(@Parent() employee: Employee) {
        return this.employeeService.getProject(employee.projectId)
    }

    @Mutation(() => Employee, { name: 'createEmployee' })
    create(@Args('employeeInput') employee: EmployeeCreateDTO) {
        return this.employeeService.create(employee)
    }
}
