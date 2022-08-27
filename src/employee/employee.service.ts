import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCreateDTO } from './dto/create.employee.input';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>) { }
    async findAll(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    async create(employee: EmployeeCreateDTO): Promise<Employee> {
        let emp = this.employeeRepository.create(employee);
        return this.employeeRepository.save(emp)
    }
}
