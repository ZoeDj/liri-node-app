require("dotenv").config();

//create variable to access key.js file 
var keys = require("./keys.js");
//create variables to access nodeJS packages
var Spotify = require("node-spotify-api");
var fs = require("fs"); 
var axios = require("axios");
var moment = require ("moment");
var spotify = new Spotify(keys.spotify);

// The first argument is command 
var command = process.argv[2];
//search can contain more than one word
var search = process.argv.slice(3).join(" ");


function searchConcert(artist) {
    var artist = search;
    var concertQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

axios.get(concertQueryURL).then(
    function(response) {
        // console.log(response);
        console.log("------- " + artist + " will perform at the folowing event -------");
        console.log("Name of the venue: " + response.data[0].venue.name);
        console.log("Venue location: " + response.data[0].venue.city);
        console.log("Date of the event: " + moment(response.data[0].venue.datetime).format("MM/DD/YYYY")); //puts the date in the right format

        // log to the txt.log
        var concertLog = "-------" + artist + " will perform at the folowing event -------" + " \r " +
        "Name of the venue: " + response.data[0].venue.name + "\r " + 
        "Venue location: " + response.data[0].venue.city + "\r " + 
        "Date of the event: " + moment(response.data[0].venue.datetime).format("MM/DD/YYYY") + "\r "  ;

        //append text to log.txt
        fs.appendFile("log.txt", concertLog, function (err){
            if (err){
                console.log(err);
            }
        });
    })  
};
// searchConcert();

function searchSong(song){
    var song = search;
    console.log("spotify key: " + spotify);

    if (!song){
        song= "The Sing";
    };

    spotify.search({ 
        type: "track",
        query: song
    }, function(err, data){
        if (err) {
            return console.log("Error occurred: " + err);
        }
        //console.log(data.tracks.items[0]);
        console.log("------- Spotify's information about song titled" + "'" + song + "'" + " ------- ");
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song's name: " + data.tracks.items[0].name);
        console.log("Song's link: " + data.tracks.items[0].href);
        console.log("Album: " + data.tracks.items[0].album.name);

        //log to the log.txt
        var songLog = "------- Spotify's information about song titled  " + "'" + song + "'" + " -------  "+ "\r  " +
        "Artist: " + data.tracks.items[0].album.artists[0].name + "\r  " +
        "Song's name: " + data.tracks.items[0].name + "\r  " +
        "Song's link: " + data.tracks.items[0].href + " \r " +
        "Album: " + data.tracks.items[0].album.name + "\r " ;

        //append text to log.txt
        fs.appendFile('log.txt', songLog, function (err){
            if (err){
                console.log(err);
            }
        });  
    })
};
// searchSong();

function searchMovie(movie){
var movie = search;
var movieQueryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

if (!movie){
    movie = "Mr. Nobody";
};

axios.get(movieQueryURL).then(
    function(response) {
    // console.log(response);
    console.log("------------ Information about " + movie + " ------------")
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);


    movieLog = "------------ Information about " + movie + " ------------" + "\r " +
    "Title: " + response.data.Title + " \r" +
    "Year: " + response.data.Year + "\r " + 
    "IMDB Rating: " + response.data.imdbRating + "\r " +
    "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r " +
    "Country: " + response.data.Country + "\r " +
    "Language: " + response.data.Language + "\r " +
    "Plot: " + response.data.Plot + "\r " +
    "Actors: " + response.data.Actors + "\r "  ;

    fs.appendFile("log.txt", movieLog, function (err){
        if (err){
            console.log(err);
        }
    });
    })
    .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
    })
};
// searchMovie();

function doWhatItSays(){
    // reads the content inside random.txt
    fs.readFile("random.txt", "utf8", function (err, data){
        if (err){
            return console.log(err);
        }
        else{
            // console.log(data);
            // stores the returned data as an array
            var random = data.split(",");
            command = random[0];
            search = random[1];
            
            liriApp(command, search);
        }
    });
    
};
// doWhatItSays();

function liriApp(command, search){
    // The switch-case will direct which function gets run.
    switch (command) {
        case "concert-this":
            searchConcert(search);
            break;
    
        case "spotify-this-song":
            searchSong(search);
            break;
        
        case "movie-this":
            searchMovie(search);
            break;
        
        case "do-what-it-says":
            doWhatItSays(search);
            break;
            //if the command is not provided, return a default message
        default:
            console.log("Please enter the command.")
    }
    };
    liriApp(command, search);