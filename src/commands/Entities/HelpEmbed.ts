import { MessageEmbed } from "discord.js";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

export class CommandsEmbed {
  public buildCommandsEmbed({ author, command }) {
    const commandEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Todos os comandos devem iniciar com .staging")
      .setAuthor("Lista de comandos")
      .setThumbnail(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvzazAaS4_nrgBi1KNgXPXTWu32Zx3XUHhoVypWD6La-3zxf0uTd-V1RHm726V83FvRQ&usqp=CAU"
      )
      .addFields(
        {
          name: "Comando",
          value: "status",
        },
        {
          name: "Descrição",
          value: "Exibe o status de todos os projetos.",
          inline: true,
        },
        {
          name: "Exemplo",
          value: ".staging status",
          inline: true,
        },
        {
          name: "\u200B",
          value: "\u200B",
        }
      )
      .addFields(
        {
          name: "Comando",
          value: "status projectName",
        },
        {
          name: "Descrição",
          value: "Exibe o status do projeto desejado.",
          inline: true,
        },
        {
          name: "Exemplo",
          value: ".staging status backend",
          inline: true,
        },
        {
          name: "\u200B",
          value: "\u200B",
        }
      )
      .addFields(
        {
          name: "Comando",
          value: "use projectName",
        },
        {
          name: "Descrição",
          value: "Indica a utilização do projeto desejado.",
          inline: true,
        },
        {
          name: "Exemplo",
          value: ".staging use backend",
          inline: true,
        },
        {
          name: "\u200B",
          value: "\u200B",
        }
      )
      .addFields(
        {
          name: "Comando",
          value: "use projectName1 projectName(N)",
        },
        {
          name: "Descrição",
          value: "Indica a utilização de varios projetos.",
          inline: true,
        },
        {
          name: "Exemplo",
          value: ".staging use backend frontend",
          inline: true,
        },
        {
          name: "\u200B",
          value: "\u200B",
        }
      )
      .addFields(
        {
          name: "Comando",
          value: "unuse projectName",
        },
        {
          name: "Descrição",
          value: "Indica a remoção da utilização do projeto desejado.",
          inline: true,
        },
        {
          name: "Exemplo",
          value: ".staging unuse backend",
          inline: true,
        },
        {
          name: "\u200B",
          value: "\u200B",
        }
      )
      .addFields(
        {
          name: "Comando",
          value: "unuse projectName1 projectName(N)",
        },
        {
          name: "Descrição",
          value: "Indica a remoção da utilização de varios projetos",
          inline: true,
        },
        {
          name: "Exemplo",
          value: ".staging unuse backend frontend",
          inline: true,
        },
        {
          name: "\u200B",
          value: "\u200B",
        }
      )
      .setTimestamp()
      .setFooter(
        `Comando [${command}] utilizado por: ${author.tag}`,
        author.displayAvatarURL()
      );

    return commandEmbed;
  }
}
