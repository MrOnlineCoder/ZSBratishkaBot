/*
	Telegram Bratishka Bot
	Author: MrOnlineCoder (vk.com/mronlinecoder | github.com/MrOnlineCoder)
	Talk to @ZSBratishkaBot
	(c) 2017
*/

var TelegramBot = require('node-telegram-bot-api');
//This value is stored in separate file and is not pushed to GitHub
var token = require("./token.json").token;
var Commands = require("./lib/commands.js");
 

var bot = new TelegramBot(token, { polling: true });
Commands.initCommands(bot);
console.log("Bratishka started!");
// Listen for any kind of message. There are different kinds of 
// messages. 
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  
  Commands.processCommand(msg);
});