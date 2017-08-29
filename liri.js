var keysINeed = require("./keys.js");
var consumerKey = keysINeed.twitterKeys.consumer_key;
var consumerSecret = keysINeed.twitterKeys.consumer_secret;
var accessTokenKey = keysINeed.twitterKeys.access_token_key;
var accessTokenSecret = keysINeed.twitterKeys.access_token_secret;

var Twitter = require('twitter');

function pullTweets(tweets) {
	var client = new Twitter({
  	consumer_key: consumerKey,
  	consumer_secret: consumerSecret,
  	access_token_key: accessTokenKey,
  	access_token_secret: accessTokenSecret
	});
 	var params = {screen_name: 'djcbootcamp'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
      }
    }
	});
}
if (process.argv[2]==="my-tweets") {
	pullTweets();
}
