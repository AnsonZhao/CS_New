/**
 * Created by imacbig04 on 4/28/17.
 */

// var selectoption = [
//     {
//         countrylevel : 'All layer',
//         citylevel : [{option: 'All layer'}]
//     },
//     {
//         countrylevel : 'United States of America',
//         citylevel : [
//             {
//                 option: '-Select a City-'
//             },
//             {
//                 option: 'Kodiak,AK'
//                 // level1: ['Energy','Water','Agriculture','Transportation','Economics','Health_Services','Risk_Management','Education'],
//                 // level2: ['Wind_Energy','Energy_Distribution','Energy_Budgets','Energy_Offices','Hydroelectric_Energy','Canneries','Drainage_Systems','Soil_Testing','Airports','Rental_Cars','Harbors','Piers','Roads','Property','Banks','Postal_Services','Hospital_and_Clinics','Health_Centers','Veterinary_Services','Eye_Care','Fire_Stations','Police_Stations','ESP_System','Higher_Education','Museums','Libraries','Elementary_School','Middle_School','High_School'],
//                 // level3: 'AK'
//             },
//             {
//                 option: 'Middletown,NY'
//                 // level1:['Energy','Water','Education'],
//                 // level2:['Energy_Distribution','Water_Quality_Tests','Water_Grids','A_World_Bridge_Sites','UNESCO_WHS','Academies','Higher_Education'],
//                 // level3: 'NY'
//             }
//         ]
//
//     }
// ];
//
//
// var jsStr = JSON.stringify(selectoption);
// var js = JSON.parse(jsStr);

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == '') {
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1) {
                objects.push(obj);
            }
        }
    }
    return objects;
}

function ChangeSelectList(countrylevel) {
    var cityList = document.getElementById("myListCity");
    while (cityList.options.length) {
        cityList.remove(0);
    }
    $.ajax({
        url: "http://localhost:9080/ChangeSelectList",
        dataType: 'json',
        success: function (results) {
            var option;
            for (var i = 0; i < results.length; i++) {
                if (countrylevel === results[i].Country) {
                    option = new Option(results[i].City, results[i].City);
                    cityList.add(option);
                    $('.panel').hide();
                    // if (results[i].City.length > 1) {
                    //     for (var j = 0; j < results[i].City.length; j++) {
                    //         option = new Option(results[i].City[j],results[i].City[j]);
                    //         cityList.City.add(option);
                    //         $('.panel').hide();
                    //     }
                    // } else {
                    //     option = new Option(results[i].City[i], i);
                    //     cityList.City.add(option);
                    //     $('.panel').show();
                    // }
                }
            }
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(msg);
        }
    });

}

function ChangeLayerList(citylevel) {
    $.ajax({
        url: "http://localhost:9080/ChangeLayerList",
        dataType: 'json',
        success: function (results) {
            var jsStr = JSON.stringify(results);
            var js = JSON.parse(jsStr);
            for (var i = 0; i < results.length; i++) {
                if (citylevel = results[i].CityName) {
                    alert("11111")

                }
                //  var returnCityObj = getObjects(js, 'City', citylevel);
                //  var cityMenu = [];
                // cityMenu = cityMenu.concat(returnCityObj[0].FirstLayer).concat(returnCityObj[0].SecondLayer).concat(returnCityObj[0].ClassName);
                //  $('.panel').hide();
                //  cityMenu.forEach(function (value) {
                //      var className = '.' + value;
                //      // console.log(className);
                //      $(className).show();
                //  })
            }
        }
    });

    // var returnCityObj = getObjects(js,'option',citylevel);
    // var cityMenu = [];
    // cityMenu = cityMenu.concat(returnCityObj[0].level1).concat(returnCityObj[0].level2).concat(returnCityObj[0].level3);
    // console.log(cityMenu);
    // $('.panel').hide();
    // cityMenu.forEach(function (value) {
    //     var className = '.' + value;
    //     $(className).show();
    // })
}


