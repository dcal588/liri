var keysINeed = require("./keys.js");
var consumerKey = keysINeed.twitterKeys.consumer_key;
var consumerSecret = keysINeed.twitterKeys.consumer_secret;
var accessTokenKey = keysINeed.twitterKeys.access_token_key;
var accessTokenSecret = keysINeed.twitterKeys.access_token_secret;

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

function pullTweets(tweets, argument, tweetCommand) {
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
function pullSpotify(argument, spotifyCommand) {
	var spotify = new Spotify({
  	id: "e2b61f19a9754d838b39511d43fc5827",
  	secret: "9c2fe91146254004b405ec9f5d3f3efd"
	});
	if (argument==="") {
 		var search = process.argv[3];
 	}
 	else {
 		var search = argument;
 	}
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

function pullMovie(argument, movieCommand) {
	if (argument==="") {
 		var movieName = process.argv[3];
 	}
 	else {
 		var movieName = argument;
 	}
 	console.log("name: " + movieName);
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	request(queryUrl, function(error, response, body){
		if(!error && response.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);			
			console.log("Produced In: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};

function pullCommand(argument) {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
  	  return console.log(error);
  	}
  	var request = data.split(",");
  	var command = request[0];
  	var argument = request[1];
  	if (command==="my-tweets") {
			pullTweets(argument);
		}
		if (command==="spotify-this-song") {
			pullSpotify(argument);
		}
		if (command==="movie-this") {
			pullMovie(argument);
		}
		if (command==="do-what-it-says") {
			pullCommand(argument);
		}
	});
};

if (process.argv[2]==="my-tweets") {
	tweetCommand = process.argv[3];
	pullTweets(tweetCommand);
}
if (process.argv[2]==="spotify-this-song") {
	spotifyCommand = process.argv[3];
	pullSpotify(spotifyCommand);
}
if (process.argv[2]==="movie-this") {
	movieCommand = process.argv[3];
	pullMovie(movieCommand);
}
if (process.argv[2]==="do-what-it-says") {
	pullCommand();
}