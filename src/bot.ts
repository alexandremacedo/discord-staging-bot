require("dotenv").config();

import { Client, Intents, Message, MessageEmbed } from "discord.js";
import { ListProjectByName } from "./commands/UseCases/Staging/Status/ListProjectByName";
import { ListAllProjects } from "./commands/UseCases/Staging/Status/ListAllProjects";
import { UseProjectByName } from "./commands/UseCases/Staging/Use/UseProjectByName";
import { UnuseProjectByName } from "./commands/UseCases/Staging/Unuse/UnuseProjectByName";
import { UseMultipleProjectsByNames } from "./commands/UseCases/Staging/Use/UseMultipleProjectsByNames";
import { UnuseMultipleProjectsByNames } from "./commands/UseCases/Staging/Unuse/UnuseMultipleProjectsByNames";
import { CommandsEmbed } from "./commands/Entities/HelpEmbed";

const lurdinha = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const lurdinha_prefix: string = ".";

lurdinha.on("ready", () => {
  console.log(`${lurdinha.user.username} tá fazendo um cafezinho! ☕`);
});

lurdinha.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(lurdinha_prefix)) {
    const [lurdinha_command, ...args] = message.content
      .trim()
      .substring(lurdinha_prefix.length)
      .split(/\s+/);

    if (!args[0]) {
      message.channel.send(
        "Que se qué?\nNão acha nada!\n\nLista de comandos:\n.staging status\n.staging api\n\t"
      );
    }

    if (lurdinha_command === "staging") {
      if (args[0] === "status" && args.length === 2) {
        const projectEmbed: any = await new ListProjectByName().execute({
          projectName: args[1],
          author: message.author,
          command: "status",
        });

        if (projectEmbed) {
          message.channel.send({ embeds: [projectEmbed] });
        } else {
          message.channel.send(
            `O projeto __**${args[1]}**__ não foi encontrado!`
          );
        }
      } else if (args[0] === "status") {
        const projectsEmbeds: any = await new ListAllProjects().execute({
          author: message.author,
          command: "status",
        });

        if (projectsEmbeds) {
          projectsEmbeds.forEach((projectEmbed) => {
            message.channel.send({ embeds: [projectEmbed] });
          });
        } else {
          message.channel.send(`Nenhum projeto foi encontrado!`);
        }
      } else if (args[0] === "use" && args.length === 2) {
        try {
          const projectEmbed: any = await new UseProjectByName().execute({
            projectName: args[1],
            author: message.author,
            command: "use",
          });

          message.channel.send({ embeds: [projectEmbed] });
        } catch (error) {
          message.channel.send(error.message);
        }
      } else if (args[0] === "use" && args.length > 2) {
        args.shift();
        try {
          const projectsEmbeds: any =
            await new UseMultipleProjectsByNames().execute({
              projectsNames: args,
              author: message.author,
              command: "use",
            });

          projectsEmbeds.forEach((projectEmbed) => {
            message.channel.send({ embeds: [projectEmbed] });
          });
        } catch (error) {
          message.channel.send(error.message);
        }
      } else if (args[0] === "unuse" && args.length === 2) {
        try {
          const projectEmbed: any = await new UnuseProjectByName().execute({
            projectName: args[1],
            author: message.author,
            command: "unuse",
          });

          message.channel.send({ embeds: [projectEmbed] });
        } catch (error) {
          message.channel.send(error.message);
        }
      } else if (args[0] === "unuse" && args.length > 2) {
        args.shift();
        try {
          const projectsEmbeds: any =
            await new UnuseMultipleProjectsByNames().execute({
              projectsNames: args,
              author: message.author,
              command: "unuse",
            });

          projectsEmbeds.forEach((projectEmbed) => {
            message.channel.send({ embeds: [projectEmbed] });
          });
        } catch (error) {
          message.channel.send(error.message);
        }
      } else if (args[0] === "help") {
        message.channel.send({
          embeds: [
            new CommandsEmbed().buildCommandsEmbed({
              author: message.author,
              command: "help",
            }),
          ],
        });
      }
    }
  }
});

lurdinha.login(process.env.DISCORD_BOT_TOKEN);
