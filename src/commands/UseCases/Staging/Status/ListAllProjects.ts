import { ProjectRepository } from "../../../Repository/ProjectRepository";
import { ProjectEmbed } from "../../../Entities/ProjectEmbed";

export class ListAllProjects {
  constructor(private projectRepository = new ProjectRepository()) {}

  public async execute({ author, command }): Promise<any> {
    const projects: any = await this.projectRepository.findAll();
    if (projects.length === 0) {
      return null;
    }

    const projectsEmbeds: any = [];
    projects.forEach((project) => {
      projectsEmbeds.push(
        new ProjectEmbed().buildProjectEmbed({ project, author, command })
      );
    });

    return projectsEmbeds;
  }
}
