import { FileRepository } from "../../services/FileRepository";

export class ProjectRepository {
  public async findByName(name: string): Promise<any> {
    return await new FileRepository().findOne(name);
  }

  public async findAll(): Promise<any> {
    return await new FileRepository().find();
  }

  public async useProject(updatedProjects): Promise<any> {
    return await new FileRepository().update(updatedProjects);
  }
}
