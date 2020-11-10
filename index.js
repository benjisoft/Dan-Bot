const Discord = require('discord.js');
const aws = require('aws-sdk');
const client = new Discord.Client();
client.timeout = 130000
var danCount = 0;
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


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (!msg.content.startsWith('!mutedan') || msg.author.bot) return;
    global.args = msg.content.slice(8).trim();
    let role = msg.guild.roles.find(r => r.name === "Muted");
    // msg.channel.send(args)
  
    if(danCount == 1) {
      let member = msg.mentions.members.first();
      console.log(member + " muted cycle started");
      member.addRole(role).catch(console.error);
      // FIXME: Currently it does it once then wont work again, until a manual restart, fix that.
      // TODO: maybe make the current time + 2 mins, then while time not equal to that keep going
      var fullDate = new Date();
      var minutes = fullDate.getMinutes();
      var minutesPlusTwo = minutes + 2;
      console.log(minutes)
      console.log(minutesPlusTwo)
      while (minutes != minutesPlusTwo) {
          var fullDate = new Date();
          var minutes = fullDate.getMinutes();
      }
      // setTimeout(() => {  member.removeRole(role).catch(console.error); }, 60000)
      member.removeRole(role).catch(console.error);
      console.log(member + " muted cycle finished");
      danCount = 0;

    }
    else {
      console.log("Mute triggered " + danCount);
      danCount += 1;
      msg.channel.send("Vote has been counted! Currently there are " + danCount + " votes. ")
    }
    });

// Heroku Run
// client.login(process.env.token);

// Added for local testing
const TOKEN = process.env.TOKEN;
client.login(TOKEN);