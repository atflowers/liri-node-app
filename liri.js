var fs = require('fs'),
    // util = require('util'),
    // var stuff = require('./adder'),
    keys = require('./keys'),
    twit = require('twitter'),
    twitter = new twit(keys.twitterKeys),
    Spotify = require('node-spotify-api'),
    spotify = new Spotify(keys.spotifyKeys),
    request = require('request');
// console.log(keys.twitterKeys.consumer_key);

// console.log(stuff.counter(['max', 'pete', 'jax']));
// console.log(stuff.adder(stuff.pi,6));


var nodeArg = process.argv[2];
var nodeArgInput = process.argv[3];
if (process.argv.length > 3) {
    for (var i = 4; i < process.argv.length; i++) {
        nodeArgInput += " " + process.argv[i];
    }
}

switch(nodeArg) {
    case "my-tweets":
        // twitter.stream('filter', {track: 'love'}, function(stream) {
        //     stream.on('data', function(data){
        //         console.log(data);
        //     })
        // });
        twitter.get('search/tweets', {q: 'SpurgeonSeewald', count: '20'}, function(error, tweets, response) {
            tweets.statuses.forEach(function(t){
                console.log(t.created_at + ": " + t.text);
            })
            // console.log(tweets.statuses[0].text);
        });
        break;
    case "spotify-this-song":
        // console.log("spotted");
        if (nodeArgInput === undefined) {
            // console.log("Type in a song name following 'spotify-this-song'.");
            // console.log("   e.g., node spotify-this-song 'Never Had A Friend Like Me'");
            spotify.search({ type: 'track', query: 'Ace of Base', limit: 15 }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                for (var i = 0; i < data.tracks.items.length; i++){
                    if (data.tracks.items[i].name === 'The Sign') {
                        console.log('   Artist:  ' + data.tracks.items[0].artists[0].name);
                        console.log('   Song:    ' + data.tracks.items[0].name);
                        console.log('   Album:   ' + data.tracks.items[0].album.name);
                        console.log('   Preview: ' + data.tracks.items[0].preview_url);
                        return;
                    } else {
                        // console.log(t.name);
                    }
                }
                // console.log(data.tracks.items[0]);
            });
        } else {
            // console.log(" You're smart to look for " + nodeArgInput);
                // $.ajax({
                //     url: 'https://api.spotify.com/v1/search',
                //     data: {
                //         q: nodeArgInput,
                //         type: 'album'
                //     },
                //     success: function (response) {
                //         console.log(response);
                //     }
                // });
            spotify.search({ type: 'track', query: nodeArgInput, limit: 2 }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                // console.log(data.tracks.items[0]);
                console.log('   Artist:  ' + data.tracks.items[0].artists[0].name);
                console.log('   Song:    ' + data.tracks.items[0].name);
                console.log('   Album:   ' + data.tracks.items[0].album.name);
                console.log('   Preview: ' + data.tracks.items[0].preview_url);
            });
        }
        break;
    case "movie-this":
        // console.log("can you spare me some cutter me brother?");
        if (nodeArgInput === undefined) {
            nodeArgInput = "Mr. Nobody";
        }
        request(
            { method: 'GET'
            , uri: 'http://www.omdbapi.com/?apikey=40e9cece&t=' + nodeArgInput
            , json: true
            }
        , function (error, response, body) {
            // body is the decompressed response body 
            // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
            // console.log('the decoded data is: ' + body)
                if (error) {
                    console.log("Encountered the following error: " + error);
                } else {
                    // console.log(body.Title);
                    console.log('   Title:             ' + body.Title);
                    console.log('   Release Year:      ' + body.Year);
                    console.log('   IMDB Rating:       ' + body.imdbRating);
                    console.log('   Tomatometer:       ' + body.Ratings[1].Value);
                    console.log('   Country of Origin: ' + body.Country);
                    console.log('   Language:          ' + body.Language);
                    console.log('   Genre:             ' + body.Genre);
                    console.log('   Cast:              ' + body.Actors);
                }
            }
        )/*.on('data', function(data) {
            // decompressed data as it is received 
            // console.log('decoded chunk: ' + data)
        })
        .on('response', function(response) {
            // unmodified http.IncomingMessage object 
            response.on('data', function(data) {
            // compressed data as it is received 
            // console.log('received ' + data.length + ' bytes of compressed data')
            // console.log(data);
            })
        })*/
        break;
    case "do-what-it-says":
        console.log("or else");
        fs.readFile('random.txt', 'utf8', function(err, data){
            //fs.writeFile('writeMe.txt', data);
            var RR = data.split(",");
            console.log(RR[0]);
        });
        break;
    default:
        console.log("");
        console.log("'" + nodeArg + "' is not a valid argument. Please select from the following list of options:")
        console.log("   - my-tweets");
        console.log("   - spotify-this-song <song name>");
        console.log("   - movie-this");
        console.log("   - do-what-it-says");
        console.log("");
        break;
}

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });