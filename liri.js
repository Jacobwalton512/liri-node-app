var action = process.argv[2];



require("dotenv").config();
var request = require("request");
var fs = require("fs")
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);



//**Switch statement that determines which action was chosen
switch(action){
    case "my-tweets":
        myTweets();
        break;
    
    case "spotify-this-song":
        spotifyThisSong();
        break;
    
    case "movie-this":
        movieThis();
        break;
    
    case "do-what-it-says":
        doWhatItSays();
        break;
};

//** Function for running the spotify search
var spotifyThisSong = function(songName) {
    if (songName === undefined) {
      songName = "What's my age again";
    }
  
    spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
  
        var songs = data.tracks.items;
  
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(getArtistNames));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      }
    );
  };

//**Function for running the movie-this command
function movieThis(){
    var movieName = process.argv[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {                           
                console.log("Title: " + JSON.parse(body).Title+
                "\n Release Year: " + JSON.parse(body).Year + 
                "\n IMDB Rating: " + JSON.parse(body).imdbRating + 
                "\n Country of Production: " + JSON.parse(body).Country + 
                "\n Language: " + JSON.parse(body).Language + 
                "\n Plot: " + JSON.parse(body).Plot + 
                "\n Actors: " + JSON.parse(body).Actors 
            )}
    });
};

function doWhatItSays(){
    fs.readFile("random.txt","utf8",function(error, data){
        data = data.split(",");
        var action = data[0];
        switch(action){
            case "my-tweets":
                myTweets();
                break;
            
            case "spotify-this-song":
                spotifyThisSong();
                break;
            
            case "movie-this":
                movieThis();
                break;
        };    
    })
};
        