var Botkit = require('botkit');
var controller = Botkit.slackbot();
// Expect a SLACK_TOKEN environment variable
var slackToken = process.env.SLACK_TOKEN;
if (!slackToken) {
  console.error('SLACK_TOKEN is required!');
  process.exit(1);
}
var bot = controller.spawn({
  token: slackToken
});
bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});
bot.configureIncomingWebhook({
  url : process.env.SLACK_WEBHOOK_URL
});
var sendTestMsg = function (msg) {
  bot.sendWebhook({
    text: msg || " A test webhook message",
    channel : '#taa-testing'
  });
};

var http = require('http');
var port = process.env.PORT || 8000;

var counter = 0;

http.createServer(function (req, res) {

  	// increment the counter for each visitor request
  	counter=counter+1;

	var path = req.url;
	console.log("requested=" + path + " counter=" + counter);

	res.writeHead(200, {'Content-Type': 'text/html'}); // prepare response headers

	if (path == "/") {
		res.end("Hello World. You are requestor # " + counter + ".<br><a href='/page2'>Page 2</a>\n");

	} else if (path == "/page2") {
		res.end("This is page 2. <a href='/'>Back.</a>\n"); // send response and close connection
	} else {
    sendTestMsg(path);
    res.end('');
  }
}).listen(port);

// console info message
console.log('Server running at http://127.0.0.1:' + port);

//
// // Daily tasks:
//
// var schedule = require('node-schedule');
//
// var sayHelloJob = schedule.scheduleJob('12 09 * * 1-5', function(){
//   bot.say({
//     text : "Chao a e",
//     channel : 'C12G10BL2'
//   });
// });
//
// // var sendPhotoJob = schedule.scheduleJob('25 09-18 * * 1-5', function(){
// //   bot.say({
// //     text : "Chao a e",
// //     channel : 'C12G10BL2'
// //   });
// // });
//
// var Watcher = require('rss-watcher');
// var feed = 'http://widget.websta.me/rss/n/anhhnt';
// var watcher = new Watcher(feed);
//
// watcher.on('new article', function (article) {
//   bot.say({
//     text : "Chao a e",
//     channel : 'C12G10BL2'
//   });
// });
