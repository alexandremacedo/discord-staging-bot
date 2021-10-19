import { CommandsEmbed } from "../../../entities/HelpEmbed";

export class Help {
  constructor() {}
  public async execute({ author, command }) {
    return new CommandsEmbed().buildCommandsEmbed({
      author: author,
      command,
    });
  }
}
