const Express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise-native');

const app = new Express();
app.use(bodyParser.urlencoded({extended: true}));

app.post('/slash/anon', (req, res) => {

  res.status(200).send('Handling your request...');

  console.log(req.body);
})

app.use('*', (req, res) => {
  res.redirect('https://github.com/Chieze-Franklin/anon-on-slack');
});

let server = app.listen(process.env.PORT || 5000, () => {
  let port = server.address().port;
  console.log(`Server started on port ${port}`)
})

// little hack to prevent app from sleeping on heroku
// https://quickleft.com/blog/6-easy-ways-to-prevent-your-heroku-node-app-from-sleeping/
if (process.env.NODE_ENV === 'production') {
  const https = require("https");
  setInterval(function() {
    https.get("https://anon-on-slack.herokuapp.com");
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>interval fired!!!");
  }, 300000); // every 5 minutes
}
