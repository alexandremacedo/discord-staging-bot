import { ProjectEmbed } from "../../../entities/ProjectEmbed";
import {
  ProjectEmptyError,
  ProjectNotFoundError,
} from "../../../handleException/ProjectException";
import { ProjectRepository } from "../../../repositories/ProjectRepository";

export class UseMultipleProjectsByNames {
  constructor(private projectRepository = new ProjectRepository()) {}
  public async execute({ projectsNames, author, command }) {
    const projects: any = await this.projectRepository.findAll();
    if (projects.length === 0) {
      throw new ProjectEmptyError(`Nenhum projeto não foi encontrado!`);
    }

    const usedProjects: any = [];

    const updatedProjects = projects.map((project: any) => {
      const findProduct = projectsNames.find(
        (projectName) => projectName === project.projectName
      );

      if (findProduct && project.status === "available") {
        const updatedProject: any = {
          status: "unavailable",
          author: {
            tag: author.tag,
            id: author.id,
            avatarURL: author.displayAvatarURL(),
          },
          started_at: new Date().getTime(),
          projectName: project.projectName,
        };

        usedProjects.push(
          new ProjectEmbed().buildProjectEmbed({
            project: updatedProject,
            author,
            command,
          })
        );

        return updatedProject;
      }

      return project;
    });

    const updated = await this.projectRepository.useProject(updatedProjects);

    if (updated) {
      return usedProjects;
    } else {
      throw new Error(`Não foi possivel realizar a ação desejada!`);
    }
  }
}
