import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) { }

  @Mutation(() => Project)
  createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    return this.projectService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'getAllProjects' })
  findAll() {
    return this.projectService.findAll();
  }

  @Query(() => Project, { name: 'getProject' })
  findOne(@Args('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Mutation(() => Project)
  updateProject(@Args('updateProject') project: UpdateProjectInput) {
    return this.projectService.update(project.id, project);
  }

  @Mutation(() => Project)
  removeProject(@Args('id') id: string) {
    return this.projectService.remove(id);
  }
}
