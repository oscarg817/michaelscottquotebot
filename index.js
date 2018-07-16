const { IncomingWebhook, WebClient, RTMClient } = require('@slack/client');
const fs = require('fs');
const axios = require('axios');

const botToken = process.env.SLACK_BOT_TOKEN;
const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const token = process.env.SLACK_TOKEN;

const rtm = new RTMClient(botToken);
const timeNotification = new IncomingWebhook(webhookUrl);
const currentTime = new Date().toTimeString();
const testMessage = new IncomingWebhook(webhookUrl);
const web = new WebClient(token);

rtm.start();

console.log('SlackBot started');


// MESSAGE HANDLER
rtm.on('message', (event) => {
	if (event.type !== 'message') {return}
	handleMessage(event)

})


//FUNCTION TO HANDLE WHAT HAPPENS TO MESSAGES AS THEY COME IN 
function handleMessage(messageData) {
	if (messageData.text === undefined) {return}
	if (messageData.text.includes(' michaelscott')) {
		const channel = messageData.channel;
		michaelScottQuote(channel);
	} 
}


function michaelScottQuote(channel) {
	rtm.sendMessage(`Michael Scott: ${quotes()}`, channel)
	.then((res) => {
		console.log(`Message sent: ${res.ts} in Channel: ${res.channel}`);
	})
	.catch(console.error);
}

function randomNumber () {
	return Math.floor(Math.random() * (11 - 1)) + 1; 
}

function quotes() {
	try {
		const quote = fs.readFileSync('michaelgaryscott', 'utf8').split('", "');
		return quote[randomNumber()]
	} catch(e) {
		console.log(e);
	}
}


