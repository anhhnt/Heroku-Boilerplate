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
bot.sendWebhook({
  text: " A test webhook message",
  channel : '#taa-testing'
});
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
