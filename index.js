const Discord = require('discord.js');
const aws = require('aws-sdk');
const client = new Discord.Client();
client.timeout = 130000
var reqCount = 0;
// var camCount = 0;

// Added for local testing
require('dotenv').config()


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function removeRole() {
  // member.removeRole(arg).catch(console.error);
  console.log('Test');
}



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (!msg.content.startsWith('!mutedan') || msg.author.bot) return;
    global.args = msg.content.slice(8).trim();
  
    if(reqCount == 1) {
      let member = msg.mentions.members.first();
      member.roles.add('652102004654735380').catch(console.error);
      setTimeout(function(){member.roles.remove('652102004654735380').catch(console.error)}, 60000, 'funky');
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