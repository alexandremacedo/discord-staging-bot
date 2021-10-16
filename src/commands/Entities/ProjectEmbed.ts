import { MessageEmbed } from "discord.js";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

export class ProjectEmbed {
  public buildProjectEmbed({ project, author, command }) {
    const usageTitle =
      project.status === "available" ? "Disponível" : "Indisponível";
    const usageColor = project.status === "available" ? "#0099ff" : "#FF4242";
    const productEmbed = new MessageEmbed()
      .setColor(usageColor)
      .setTitle(usageTitle)
      .setAuthor(
        project.projectName.toUpperCase(),
        "https://i.imgur.com/nyljaMXb.jpg"
      )
      .setThumbnail(
        project.author?.avatarURL ??
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvzazAaS4_nrgBi1KNgXPXTWu32Zx3XUHhoVypWD6La-3zxf0uTd-V1RHm726V83FvRQ&usqp=CAU"
      )
      .addFields(
        {
          name: "Em uso por:",
          value: project.author?.tag ?? "N/A",
          inline: true,
        },
        {
          name: "Tempo de uso:",
          value: project.started_at
            ? formatDistance(project.started_at, new Date(), {
                addSuffix: true,
                locale: ptBR,
              })
            : "N/A",
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter(
        `Comando [${command}] utilizado por: ${author.tag}`,
        author.displayAvatarURL()
      );

    if (project.status === "available") {
      productEmbed.setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }

    return productEmbed;
  }
}
