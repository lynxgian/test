const { RichEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["h","?"],
    usage: "(command)",
    category: "info",
    description: "Show available commands.",
    run: async (bot, message, args) => {
      message.delete(500).catch(e=>{});
      const embed = new RichEmbed()
          .setColor("CYAN")
          .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
          .setThumbnail(bot.user.displayAvatarURL)
      if(!args[0]) {
          const categories = readdirSync("./commands/")
          let etc = "\n purge \n ping \n plugins \n whois \n ban \n kick \n purge \n  report \n tickets: \n ticket \n close"
          embed.setDescription(`These are the available commands for ${message.guild.me.displayName}\nThe bot prefix is: **-**`)
          embed.addField("To get more help: ", '[click me](https://discord.gg/EdVZAqy)')
          embed.setFooter(`© Hydro| Total Commands: ${bot.commands.size} Total Servers: ${bot.guilds.size}`, bot.user.displayAvatarURL);
          categories.forEach(category => {
              const dir = bot.commands.filter(c => c.category === category)
              const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
              let displayedCategoryChar = bot.categorychars.get(category) || "";
              try {
                  embed.addField(` ${displayedCategoryChar} ${capitalise} category (Commands: ${dir.size})`, dir.map(c => `\`${c.name}\` - ${c.description}`))
              } catch (e) {
                  console.log(e)
              }
          })
          return message.channel.send(embed).then(m=>m.delete(15000).catch(e=>{}))
      }else {
          let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
          if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${bot.prefix}help\` for the list of commands.`))
          embed.setDescription(stripIndents`The bots prefix is **-**\n
          **Command:** ${command.slice(0, 1).toUpperCase() + command.name.slice(1)}
          **Description:** ${command.description || "No Description provided."}
          **Usage:** ${command.usage ? `\`**-**${command.name} ${command.usage}\`` : "No Usage"}
          **Accessible By:** ${command.accessibleby || "Members"}
          **Aliases:** ${command.aliases ? command.aliases.join(" ") : "None"}`)
          return message.channel.send(embed).then(m=>m.delete(15000).catch(e=>{}))
      }
    }
}