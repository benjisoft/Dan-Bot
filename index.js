const Discord = require('discord.js');
const aws = require('aws-sdk');
const client = new Discord.Client();
client.timeout = 130000
var reqCount = 0;

// Added for local testing
require('dotenv').config()


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (!msg.content.startsWith('!votemute') || msg.author.bot) return;
    global.args = msg.content.slice(8).trim();
  
    if(reqCount == 4) {
      let member = msg.mentions.members.first();
      member.roles.add('652102004654735380').catch(console.error);
      setTimeout(function(){member.roles.remove('652102004654735380').catch(console.error)}, 120000, 'funky');
      msg.channel.send(args + " has been muted")
      reqCount = 0;
    }
    else {
      console.log("Mute voted " + reqCount);
      reqCount += 1;
      msg.channel.send("Vote has been counted! Currently there are " + reqCount + " votes. ")
    }
    });

// Heroku Run
// client.login(process.env.token);

// Added for local testing
const TOKEN = process.env.TOKEN;
client.login(TOKEN);