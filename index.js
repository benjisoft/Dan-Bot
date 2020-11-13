const Discord = require('discord.js');
const aws = require('aws-sdk');
const client = new Discord.Client();
client.timeout = 130000
var voteCounts = {};


// Added for local testing
require('dotenv').config()


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (!msg.content.startsWith('!votemute') || msg.author.bot) return;
    global.args = msg.content.slice(9).trim();

    if(args == "") {
        msg.channel.send("Please give someone to vote to mute.");
    }
    else if (voteCounts[args] == 4) {
      let member = msg.mentions.members.first();
      member.roles.add('652102004654735380').catch(console.error);
      setTimeout(function(){member.roles.remove('652102004654735380').catch(console.error)}, 120000, 'funky');
      msg.channel.send(args + " has been muted");
      voteCounts[args] += 1;
      console.log("Mute voted for " + args + " " + voteCounts[args] + "/5");
      console.log(args + " has been muted");
      voteCounts[args] = 0;
    }
    else {
      if (voteCounts.hasOwnProperty(args)) {
        voteCounts[args] += 1;
      }
      else {
        voteCounts[args] = 0;
      }
      console.log("Mute voted for " + args + " " + voteCounts[args] + "/5");
      msg.channel.send("Vote has been counted! Currently there are " + voteCounts[args] + " votes. ");
    }
    });

// Heroku Run
// client.login(process.env.token);

// Added for local testing
const TOKEN = process.env.TOKEN;
client.login(TOKEN);