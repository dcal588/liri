var keysINeed = require("./keys.js");
var consumerKey = keysINeed.twitterKeys.consumer_key;
var consumerSecret = keysINeed.twitterKeys.consumer_secret;
var accessTokenKey = keysINeed.twitterKeys.access_token_key;
var accessTokenSecret = keysINeed.twitterKeys.access_token_secret;

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

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
function pullSpotify() {
	var spotify = new Spotify({
  	id: "e2b61f19a9754d838b39511d43fc5827",
  	secret: "9c2fe91146254004b405ec9f5d3f3efd"
	});
 	var search = process.argv[3];
	spotify.search({ type: 'track', query: search }, function(err, data) {
  	if (err) {
    	return console.log('Error occurred: ' + err);
 		}
 		for (var i = 0; i < 1; i++) {
			console.log(data.tracks.items[i].album.artists[i].name);
			console.log(data.tracks.items[i].name);
			console.log(data.tracks.items[i].preview_url);
			console.log(data.tracks.items[i].album.name);
    } 
	});
};

if (process.argv[2]==="my-tweets") {
	pullTweets();
}
if (process.argv[2]==="spotify-this-song") {
	pullSpotify();
}
if (process.argv[2]==="movie-this") {
	pullTweets();
}
if (process.argv[2]==="do-what-it-says") {
	pullTweets();
}
