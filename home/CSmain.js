/**
 * Created by imacbig04 on 4/28/17.
 */

var express = require('express');
var app = express();

var mysql = require('mysql');

// http://nodejs.org/docs/v0.6.5/api/fs.html#fs.writeFile

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

connection.connect(function(err) {
    if (err) throw err;
    //Select all customers and return the result object:
    connection.query("SELECT LayerName FROM LayerMenu", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.JSON(result)
    });
});

var server = app.listen(9080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("SmartSearch app is listening at http://%s:%s", host, port)

});