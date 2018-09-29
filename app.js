var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var moment = require('moment');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("search");    
});

app.get("/results", function(req, res){
    var origin = req.query.origin;
    var destination = req.query.destination;
    var departure_date = req.query.departure_date;
    var return_date = req.query.return_date;
    var adults = req.query.adults;
    var api_key = "";

    var url = "https://api.sandbox.amadeus.com/v1.2/flights/affiliate-search?apikey="+api_key+"&origin="+origin+"&destination="+destination+"&departure_date="+departure_date+"&return_date="+return_date+"&adults="+adults+"&currency=USD&mobile=false"
   
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
            //res.redirect(url);
            res.render("results", {data: data, moment: moment});
        }
    });
});



app.listen(3000, () => console.log('MyBlog Site is now running on port 3000!'));