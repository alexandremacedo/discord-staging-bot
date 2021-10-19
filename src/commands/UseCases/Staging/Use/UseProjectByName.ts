import { ProjectEmbed } from "../../../entities/ProjectEmbed";
import {
  ProjectEmptyError,
  ProjectNotFoundError,
} from "../../../handleException/ProjectException";
import { ProjectRepository } from "../../../repositories/ProjectRepository";

export class UseProjectByName {
  constructor(private projectRepository = new ProjectRepository()) {}
  public async execute({ projectName, author, command }) {
    const project: any = await this.projectRepository.findByName(projectName);
    if (project.projectName === undefined) {
      throw new ProjectNotFoundError(
        `O projeto __**${projectName}**__ não foi encontrado`
      );
    }

    if (project.author && project.author.id === author.id) {
      throw new Error(
        `O projeto __**${projectName}**__ já está sendo usado por você!`
      );
    }

    if (project.status === "unavailable") {
      throw new Error(
        `O projeto __**${projectName}**__ está sendo usado pelo, __**${project.author.tag}**__`
      );
    }

    const projects: any = await this.projectRepository.findAll();
    if (projects.length === 0) {
      throw new ProjectEmptyError(`Nenhum projeto não foi encontrado!`);
    }

    let updatedProject: any = {
      status: "unavailable",
      author: {
        tag: author.tag,
        id: author.id,
        avatarURL: author.displayAvatarURL(),
      },
      started_at: new Date().getTime(),
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
