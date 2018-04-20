
var express = require('express');
var app      = express();
var mysql = require('mysql');



var connection = mysql.createConnection({
    multipleStatements: true,
    host: '10.11.4.97',
    user: 'AppUser',
    password: 'Special888%',
    database: 'CitySmart'
});

    // connection.query("SELECT LayerName FROM LayerMenu", function (err,result) {
    //     if (err) throw err;
    //     console.log(result);
    //     app.render(result,"WMS.html")
    //     // res.JSON(result);
    //     // res.JSON(result);
    // });

//      app.get('/checkbox', function (req, res) {
//          res.setHeader("Access-Control-Allow-Origin", "*");
//
//          connection.query("SELECT * From CitySmart.LayerMenu", function (err,result) {
//          console.log("recive and processing");
//
//          var JSONresult = JSON.stringify(result, null, "\t");
//
//          res.send(JSONresult);
//          res.end();
//
//          });
//
//      });
//
//     app.get('/secondlayer', function (req, res) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//
//     connection.query("SELECT SecondLayer FROM LayerMenu", function (err,result) {
//
//         console.log("recive and processing");
//
//         var JSONresult = JSON.stringify(result, null, "\t");
//
//         res.send(JSONresult);
//         res.end();
//
//     });
//
// });
//     app.get('/firstlayer', function (req, res) {
//
//     res.setHeader("Access-Control-Allow-Origin", "*");
//
//     connection.query("SELECT FirstLayer FROM LayerMenu", function (err,result) {
//
//         console.log("recive and processing");
//
//         var JSONresult = JSON.stringify(result, null, "\t");
//
//         res.send(JSONresult);
//
//         res.end();
//
//     });
//
// });
//
//      app.get('firstlayer',function(req,res) {
//          connection.query("SELECT LayerName FROM LayerMenu", function (err, result) {
//          });
//      });


    app.get('/ChangeSelectList', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    connection.query("SELECT Country, City FROM Country2City", function (err, results) {
        if (err) throw err;
        res.send(results);
        res.end();
    });
});

    app.get('/ChangeLayerList', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    connection.query("SELECT FirstLayer , SecondLayer , CityName , ClassName FROM LayerMenu", function (err, results) {
        if (err) throw err;
        var layerInfo = JSON.stringify(results, null, "\t");
        res.send(layerInfo);
        console.log(res);
        res.end();

    });
});


     app.listen(9080, function() {
         console.log("My API is running...");
     });



