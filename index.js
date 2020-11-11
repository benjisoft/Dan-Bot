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
    // msg.channel.send(args)
  
    if(reqCount == 1) {
      let member = msg.mentions.members.first();
      console.log(member + " muted cycle started");
      member.roles.add('652102004654735380').catch(console.error);
      // FIXME: Currently it does it once then wont work again, until a manual restart, fix that.
      // TODO: maybe make the current time + 2 mins, then while time not equal to that keep going
      // var fullDate = new Date();
      // var minutes = fullDate.getMinutes();
      // var minutesPlusTwo = minutes + 2;
      // console.log(minutes)
      // console.log(minutesPlusTwo)
      // while (minutes != minutesPlusTwo) {
      //     var fullDate = new Date();
      //     var minutes = fullDate.getMinutes();
      // }
      setTimeout(function(){member.roles.remove('652102004654735380').catch(console.error)}, 60000, 'funky');
      // setTimeout(removeRole(), 60000, 'funky')
      // setTimeout(() => {  member.roles.remove('652102004654735380').catch(console.error); }, 60000)
      // member.removeRole(role).catch(console.error);
      console.log(member + " muted cycle finished");
      reqCount = 0;
      // client.destroy().then(() => {
      //   client.login(TOKEN);
      // });      

    }
    else {
      console.log("Mute triggered " + reqCount);
      reqCount += 1;
      msg.channel.send("Vote has been counted! Currently there are " + reqCount + " votes. ")
    }
    });

// Heroku Run
// client.login(process.env.token);

// Added for local testing
const TOKEN = process.env.TOKEN;
client.login(TOKEN);