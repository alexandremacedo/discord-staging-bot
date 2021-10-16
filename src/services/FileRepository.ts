import fs from "fs";

const DATABASE = `${__dirname}/../../temp/data/projectsUsage.json`;

export class FileRepository {
  public async findOne(name: string): Promise<any> {
    let rawProjects = fs.readFileSync(DATABASE);
    let projects = JSON.parse(String(rawProjects));

    const project = projects.find((project) => project.projectName === name);

    return project ?? {};
  }

  public async find(): Promise<any> {
    let rawProjects = fs.readFileSync(DATABASE);
    let projects = JSON.parse(String(rawProjects));
    return projects ?? [];
  }

  public async update(projects: any): Promise<any> {
    fs.writeFile(DATABASE, JSON.stringify(projects), function writeJSON(err) {
      if (err) return false;
    });

    return true;
  }
}
