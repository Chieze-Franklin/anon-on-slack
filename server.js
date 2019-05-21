const Express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise-native');
const SlackBot = require('slackbots');

const bot = new SlackBot({
  token: 'xoxb-258316641222-427105399910-LBJxaOpoGMAtL75yrHSTLCHR', 
  name: 'anon'
});

const app = new Express();
app.use(bodyParser.urlencoded({extended: falseß}));
app.use(bodyParser.json());

app.post('/slash/anon', (req, res) => {

  res.status(200).send('Handling your request...');

  console.log('/slash/anon:', req.body);
})

app.use('*', (req, res) => {
  res.redirect('https://github.com/Chieze-Franklin/anon-on-slack');
});

let server = app.listen(process.env.PORT || 5000, () => {
  let port = server.address().port;
  console.log(`Server started on port ${port}`)
})

bot.on('start', function() {
  var params = {
    icon_emoji: ':cat:'
  };

  //bot.postMessageToChannel('general', 'meow!');
  //bot.getUser('Franklin Chieze').then(function(data){console.log('1:', data)});
  //bot.getUser('@Franklin Chieze').then(function(data){console.log('1:', data)});
  bot.getUsers().then(function(data){console.log(data)});
  //bot.getUsers().then(function(data){data.members.forEach(function(m){console.log(m.profile)})});
  //bot.postMessageToUser('chieze.franklin', 'hi there', function(data){ console.log(data); });
  //bot.postMessageToUser('Franklin Chieze', 'Franklin Chieze', function(data){ console.log('Franklin Chieze:', data); });
});

bot.on('message', function(data) {
  // all ingoing events https://api.slack.com/rtm
  console.log('message:', data);
});

// little hack to prevent app from sleeping on heroku
// https://quickleft.com/blog/6-easy-ways-to-prevent-your-heroku-node-app-from-sleeping/
if (process.env.NODE_ENV === 'production') {
  const https = require("https");
  setInterval(function() {
    https.get("https://anon-on-slack.herokuapp.com");
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>interval fired!!!");
  }, 300000); // every 5 minutes
}
