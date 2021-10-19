import { ProjectEmbed } from "../../../entities/ProjectEmbed";
import { ProjectRepository } from "../../../repositories/ProjectRepository";

export class ListProjectByName {
  constructor(private projectRepository = new ProjectRepository()) {}

  public async execute({ projectName, author, command }: any): Promise<any> {
    const project: any = await this.projectRepository.findByName(projectName);

    if (project.projectName === undefined) {
      return null;
    }

    return new ProjectEmbed().buildProjectEmbed({ project, author, command });
  }
}
