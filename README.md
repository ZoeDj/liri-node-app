# liri-node-app

# LIRI App

**LIRI** (*Language Interpretation and Recognition Interface* )is a command line node app that takes in parameters and gives you back data 

LIRI searchs Bands in Town for concerts :guitar: , Spotify for songs :notes: , and OMDB for movies :movie_camera: .

LIRI can take in one of the four commands:

1. `node liri.js concert-this <artist/band name here>`
This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

- Name of the venue
- Venue location
- Date of the Event

2. `node liri.js spotify-this-song '<song name here>'`
This will show the following information about the song in your terminal/bash window

- Artist(s)
- The song's name
- A preview link of the song from Spotify
- The album that the song is from

If no song is provided then LIRI will default to "The Sign" by Ace of Base.


3. `node liri.js movie-this '<movie name here>'`
This will output the following information to your terminal/bash window:

- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Rotten Tomatoes Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`
LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


  * * note: If you want to clone this app from your github and run it yourself, you would need to supply your own `.env` file for it to work. You would need to replace the values with your API keys:
  - SPOTIFY_ID=your-spotify-id
  - SPOTIFY_SECRET=your-spotify-secret


## Technologies Used:

* Node.js
* JavaScript
* npm packages
* * Node-Spotify-API
* * Axios
* * Moment
* * DotEnv


This is my demo of the Liri App

![](http://g.recordit.co/TiUrCpS2bh.gif)