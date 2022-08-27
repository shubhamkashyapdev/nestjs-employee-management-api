import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project) private projectRepository: Repository<Project>) { }

  async create(projectInput: CreateProjectInput): Promise<Project> {
    let project = this.projectRepository.create(projectInput)
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ["employees"]
    })
  }

  async findOne(id: string): Promise<Project> {
    //@todo - return item by id instead
    return this.projectRepository.findOne({
      where: { id },
      relations: ["employees"]
    })
  }

  update(id: string, updateProjectInput: UpdateProjectInput) {
    let project: Project = this.projectRepository.create(updateProjectInput)
    project.id = id;
    return this.projectRepository.save(project)
  }

  async remove(id: string): Promise<Project> {
    let proj = this.findOne(id)
    if (proj) {
      let ret = await this.projectRepository.delete(id)
      if (ret.affected === 1) {
        return proj;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`)
  }
}

