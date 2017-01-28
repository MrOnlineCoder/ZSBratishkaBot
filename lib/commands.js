var bot;
var commands = {};
var phrases = require("../phrases.json").list;
var utils = require("./utils.js");
var messages = require("../messages.json");
var fs = require("fs");
var photos = [1,2,3,4,5,6,7];

function initCommands(botInstacne) {
	bot = botInstacne;
	commands["start"] = helpHandler;
	commands["help"] = helpHandler;
	commands["phrase"] = phraseHandler;
	commands["sing"] = singHandler;
	commands["photo"] = photoHandler;
}

function photoHandler(msg) {
	bot.sendPhoto(msg.chat.id, fs.createReadStream("./res/"+utils.randomElement(photos)+".jpg"));
}

function singHandler(msg) {
	bot.sendVoice(msg.chat.id, fs.createReadStream("./res/song.ogg"));
}

function phraseHandler(msg) {
	send(msg, utils.randomElement(phrases));
}

function helpHandler(msg) {
	send(msg, messages.help);
}

function send(msg, text) {
	bot.sendMessage(msg.chat.id, text);
}


function processCommand(msg) {
	var text = msg.text;
	if (text.charAt(0) != "/") {
		send(msg, messages.unknownCmd);
		return;
	}

	var cmd = text.substring(1);
	if (commands[cmd] == null) {
		send(msg, messages.unknownCmd);
		return;
	}

	console.log("<"+msg.from.username+"> "+cmd);
	commands[cmd](msg);
}

module.exports.initCommands = initCommands;
module.exports.processCommand = processCommand;