import { ProjectEmbed } from "../../../entities/ProjectEmbed";
import {
  ProjectEmptyError,
  ProjectNotFoundError,
} from "../../../handleException/ProjectException";
import { ProjectRepository } from "../../../repositories/ProjectRepository";

export class UnuseMultipleProjectsByNames {
  constructor(private projectRepository = new ProjectRepository()) {}
  public async execute({ projectsNames, author, command }) {
    const projects: any = await this.projectRepository.findAll();
    if (projects.length === 0) {
      throw new ProjectEmptyError(`Nenhum projeto não foi encontrado!`);
    }

    const unusedProjects: any = [];

    const updatedProjects = projects.map((project: any) => {
      const findProduct = projectsNames.find(
        (projectName) => projectName === project.projectName
      );

      if (
        project.author &&
        findProduct &&
        project.status === "unavailable" &&
        project.author.id === author.id
      ) {
        const updatedProject: any = {
          status: "available",
          author: null,
          started_at: null,
          projectName: project.projectName,
        };

        unusedProjects.push(
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
      return unusedProjects;
    } else {
      throw new Error(`Não foi possivel realizar a ação desejada!`);
    }
  }
}
