var keysINeed = require("./keys.js");
var consumerKey = keysINeed.twitterKeys.consumer_key;
var consumerSecret = keysINeed.twitterKeys.consumer_secret;
var accessTokenKey = keysINeed.twitterKeys.access_token_key;
var accessTokenSecret = keysINeed.twitterKeys.access_token_secret;

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessTokenKey,
  access_token_secret: accessTokenSecret
});
 
var params = {screen_name: 'djcbootcamp'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	data = JSON.parse(response.body);
    console.log(data);
  }
});
console.log(consumerKey)
console.log(consumerSecret)
console.log(accessTokenKey)
console.log(accessTokenSecret)
 