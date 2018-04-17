/**
 * Created by imacbig04 on 4/28/17.
 */

var express = require('express');
var app = express();

var mysql = require('mysql');

var connection = mysql.createConnection({
    multipleStatements: true,
    host: '10.11.4.97',
    user: 'AppUser',
    password: 'Special888%',
    database: 'CitySmart'
});

app.get('/ChangeSelectList', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    connection.query("SELECT Country, City FROM Country2City", function (err, results) {
        if (err) throw err;
        console.log(results);
        res.send(results);
        res.end();
    });
});

app.get('/ChangeLayerList', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    connection.query("SELECT FirstLayer , SecondLayer , CityName , ClassName FROM LayerMenu", function (err, results) {
        if (err) throw err;
        res.send(results);
        res.end();
    });
});


var server = app.listen(9080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("SmartSearch app is listening at http://%s:%s", host, port)
});