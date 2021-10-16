import { ProjectEmbed } from "../../../Entities/ProjectEmbed";
import {
  ProjectEmptyError,
  ProjectNotFoundError,
} from "../../../HandleException/ProjectException";
import { ProjectRepository } from "../../../Repository/ProjectRepository";

export class UnuseProjectByName {
  constructor(private projectRepository = new ProjectRepository()) {}
  public async execute({ projectName, author, command }) {
    const project: any = await this.projectRepository.findByName(projectName);
    if (project.projectName === undefined) {
      throw new ProjectNotFoundError(
        `O projeto __**${projectName}**__ não foi encontrado`
      );
    }

    if (!project.author) {
      throw new Error(`O projeto __**${projectName}**__ não está sendo usado!`);
    }

    if (project.author.id !== author.id) {
      throw new Error(
        `O projeto __**${projectName}**__ não está sendo usado por você!\nSómente o __*${project.author.tag}*__ pode executar está ação!`
      );
    }

    const projects: any = await this.projectRepository.findAll();
    if (project.length === 0) {
      throw new ProjectEmptyError(`Nenhum projeto não foi encontrado!`);
    }

    let updatedProject: any = {
      status: "available",
      author: null,
      started_at: null,
      projectName,
    };

    const updatedProjects = projects.map((project: any) => {
      if (project.projectName === projectName) {
        return updatedProject;
      }
      return project;
    });

    const updated = await this.projectRepository.useProject(updatedProjects);

    if (updated) {
      return new ProjectEmbed().buildProjectEmbed({
        project: updatedProject,
        author,
        command,
      });
    } else {
      throw new Error(`Não foi possivel realizar a ação desejada!`);
    }
  }
}
