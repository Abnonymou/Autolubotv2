module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['info'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'Develeoper',
};
module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 20;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `
▄▀█ █░█ ▀█▀ █▀█ █▄▄ █▀█ ▀█▀
█▀█ █▄█ ░█░ █▄█ █▄█ █▄█ ░\n   \n━━━━━━━━━━━\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `➤\t${i + 1}▪﹝${prefix}${commands[i]}﹞\n`;
      }
      helpMessage += '\n⪼𝗘𝗩𝗘𝗡𝗧.𝗟𝗜𝗦𝗧⪻\n━━━━━━━━━━━\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `➥\t${index + 1}▪﹝${prefix}${eventCommand}﹞\n`;
      });
      helpMessage += `\n\n▪[📚]𝗣𝗔𝗚𝗘 : [${page}/${Math.ceil(commands.length / pages)}]\n━━━━━━━━━━━\n𝗔𝗨𝗧𝗢𝗕𝗢𝗧 𝗖𝗥𝗘𝗔𝗧𝗢𝗥: 𝗞𝗬𝗟𝗘 𝗕𝗔𝗜𝗧-𝗜𝗧ツ\n[🔗]▪𝗟𝗜𝗡𝗞-𝗙𝗕: https://www.facebook.com/itssmekylebaitit\n[⚙️]𝗔𝗨𝗧𝗢𝗕𝗢𝗧 𝗟𝗜𝗡𝗞:\n❶  \n❷ https://two73637747383839493948383-82848283.onrender.com`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 20;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `▪〉𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝘀 - 𝗟𝗜𝗦𝗧(－－〆)[🔖]\n━━━━━━━━━━━\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `➤\t${i + 1}▪﹝${prefix}${commands[i]}﹞\n`;
      }
      helpMessage += '\n⪼𝗘𝗩𝗘𝗡𝗧.𝗟𝗜𝗦𝗧⪻\n━━━━━━━━━━━\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `➥\t${index + 1}▪﹝${prefix}${eventCommand}﹞\n`;
      });
      helpMessage += `\n▪[📚]𝗣𝗔𝗚𝗘 : [${page}/${Math.ceil(commands.length / pages)}]\n━━━━━━━━━━━\n[🆔]𝗔𝗨𝗧𝗢𝗕𝗢𝗧 𝗖𝗥𝗘𝗔𝗧𝗘𝗗 𝗕𝗬 : 𝗔𝗡𝗝𝗔/𝗧𝗛𝗘𝗔🏅\n[🗝️]▪𝗟𝗜𝗡𝗞-𝗙𝗕 :https://www.facebook.com/thegodess.aesther\n[⚙️]𝗟𝗜𝗡𝗞 𝗔𝗨𝗧𝗢𝗕𝗢𝗧 :https://aesther-anja-autobot.onrender.com/ `;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? '➛ Permission: user' : (role === 1 ? '➛ Permission: admin' : (role === 2 ? '➛ Permission: thread Admin' : (role === 3 ? '➛ Permission: super Admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `➛ Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `Description: ${description}\n` : '';
        const usageMessage = usage ? `➛ Usage: ${usage}\n` : '';
        const creditsMessage = credits ? `➛ Credits: ${credits}\n` : '';
        const versionMessage = version ? `➛ Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `➛ Cooldown: ${cooldown} second(s)\n` : '';
        const message = ` 「 Command 」\n\n➛ Name: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.handleEvent = async function({
  api,
  event,
  prefix
}) {
  const {
    threadID,
    messageID,
    body
  } = event;
  const message = prefix ? '☁️𝗣𝗥𝗘𝗙𝗜𝗫^- ⩊ -マ₎𐒡☁️\n━━━━━━━━━\n➤𝙲𝙼𝙳𝚂: ' + prefix : "𝙎𝙊𝙍𝙍𝙔........(ᵕ—ᴗ—) ♡\n━━━━━━━━━━━\nI don't have 𝚊 𝗣𝗥𝗘𝗙𝗜𝗫";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
}
