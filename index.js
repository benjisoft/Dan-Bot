const Discord = require('discord.js');
const aws = require('aws-sdk');
const client = new Discord.Client();
var danCount = 0;
var camCount = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var config = new aws.S3({
    token: process.env.token
  });

client.on('message', msg => {
  if (msg.content === '!mutedan') {
      if(danCount == 5) {
          msg.channel.send("?mute <@579965584872177665> 2 Public Opinion")
          danCount = 0;
      } else {
          console.log("Mute triggered" + danCount);
          danCount += 1;
          msg.channel.send("Vote has been counted! Currently there are " + danCount + " votes. ")
      }
  }
});

client.login(config.token);