/*
* Copyright 2015-2017 WorldWind Contributors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

requirejs(['./WorldWindShim',
        './LayerManager',
        './OptionList',
        './GlobeInterface',
        './Globe',
        './Controls',
        './HeatmapPanel'],
    function (WorldWind,
              LayerManager,
              OptionList,
              GlobeInterface,
              Globe,
              Controls,
              HeatmapPanel) {
        "use strict";

        var globeID = "canvasOne";

        // new ESTWA({globe: globeID});

        var globe = new Globe({id: globeID});
        var controls = new Controls(globe);
        var gInterface = new GlobeInterface(globe);

        var heatmapPanel = new HeatmapPanel(globe, gInterface.globe.navigator, gInterface.globe.worldWindowController, controls);

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // var wwd = new WorldWind.WorldWindow("canvasOne");
        //
        // // Standard WorldWind layers
        // var layers = [
        //     {layer: new WorldWind.BMNGLayer(), enabled: true},
        //     {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
        //     {layer: new WorldWind.BingAerialLayer(null), enabled: false},
        //     {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: false},
        //     {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
        //     {layer: new WorldWind.CompassLayer(), enabled: true},
        //     {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        //     {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        // ];
        //
        // for (var l = 0; l < layers.length; l++) {
        //     layers[l].layer.enabled = layers[l].enabled;
        //     wwd.addLayer(layers[l].layer);
        // }

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(globe);

        // Web Map Service information from NASA's Near Earth Observations WMS
        var serviceAddress = "http://cs.aworldbridgelabs.com:8080/geoserver/ows?service=WMS&request=GetCapabilities&version=1.1.1";
        // Named layer displaying Average Temperature data

        // var layerName = ["City_Smart:KEAGridMap_Layer","City_Smart:OHC_3","City_Smart:Overhead_Transformers","City_Smart:OHC_1","City_Smart:OHC_2","City_Smart:UGC_1","City_Smart:UGC_2","City_Smart:UGC_3","City_Smart:Wire_Transmission_Kodiak","City_Smart:Kodiak_Large_Transformers","City_Smart:Kodiak_Small_Transformers","City_Smart:Airport_Substation","City_Smart:K_Subs","City_Smart:Kodiak_Substations","City_Smart:FUSE_line_Kodiak","City_Smart:power","City_Smart:power2","City_Smart:Line_WMS_Kodiak_Trident","City_Smart:Polygon_WMS_Kodiak_Trident","City_Smart:MANHOLE_line","City_Smart:MANHOLE_polygon","City_Smart:water2c_FTAA","City_Smart:water3_FTAA","City_Smart:water1c_FTAA","City_Smart:water2_FTAA","City_Smart:water3c_FTAA","City_Smart:water1_FTAA","City_Smart:BaseRoad_Layer","City_Smart:Kodiak_Road_System","City_Smart:KEAParcelMap_Layer"];
        var layerName = [];

        var layers = globe.layers;
        // var layer2 = [];

        $(document).ready(function () {
            $(".switch_right").each(function (i) {
                layerName[i] = $(this).val();

            });
            // (layerName2).push(layer2);
            var strs = layerName+'';

            var res = strs.split(",");

            layerName = res.slice(0);
            // console.log(layerName);
        });


        // function splitString(stringToSplit, separator) {
        //     var arrayOfStrings = stringToSplit.(separator);
        //
        //     console.log('The original string is: "' + stringToSplit + '"');
        //     console.log('The separator is: "' + separator + '"');
        //     console.log('The array has ' + arrayOfStrings.length + ' elements: ' + arrayOfStrings.join(' / '));
        // }
        // var comma = ',';
        //
        // splitString(layerName, comma);



        var createLayer = function (xmlDom) {
            // Create a WmsCapabilities object from the XML DOM
            var wms = new WorldWind.WmsCapabilities(xmlDom);
            // Retrieve a WmsLayerCapabilities object by the desired layer name
            for (var n = 0; n < layerName.length; n++) {
                var NA = layerName[n];

                var wmsLayerCapabilities = wms.getNamedLayer(NA);
                // console.log(wmsLayerCapabilities);
                // Form a configuration object from the WmsLayerCapability object
                var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
                // Modify the configuration objects title property to a more user friendly title
                wmsConfig.title = NA;
                // Create the WMS Layer from the configuration object
                var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
                // Add the layers to WorldWind and update the layer manager
                globe.addLayer(wmsLayer);
                // layerManager.synchronizeLayerList();
            }

        };

        $(function(){
            $('.switch_right').click(function(){
                var val = [];
                if ($('.switch_right').is(":checkbox:checked")) {

                    // console.log("true"+val);

                    $(':checkbox:checked').each(function () {
                        val = $(this).val();
                        var str = val+'';
                        val = str.split(",");

                        for (var a = 0; a < layers.length; a++) {
                            for(var i = 0; i < val.length; i++) {
                                if (layers[a].displayName === val[i]) {

                                    layers[a].enabled = true;

                                } else if (val.length < 1 ) {
                                    console.log("error");
                                }
                            }
                        }

                    });
                }

                if($('.switch_right').is(":not(:checked)")) {
                    // console.log("enable:false");
                    var layer = [];
                    $(":checkbox:not(:checked)").each(function (i) {
                        layer = $(this).val();
                        var str = layer+'';
                        layer = str.split(",");
                        // console.log(str);
                        // console.log(layer[i]);


                        // console.log(val);
                        // console.log("s"+layers[a].displayName);

                        for (var a = 0; a < layers.length; a++) {
                            for(var l = 0; l < layer.length; l++) {
                                if (layers[a].displayName === layer[l]) {

                                    layers[a].enabled = false;
                                    console.log("str: " + layers[a].displayName);
                                    // console.log(layers[a]);
                                }
                            }
                        }

                    });
                }
                // $.get(serviceAddress).done(createLayer).fail(logError);
            });
        });

        $(document).ready(function(){
            $.ajax({
                type: "GET",
                url: "http://cs.aworldbridgelabs.com:8080/geoserver/ows?service=WMS&request=GetCapabilities&version=1.1.1",
                dataType: "xml",
                success: function(xml){
                    $(xml).find('Layer').each(function(){
                         var sTitle = $(this).find('Name').text();
                        layerName.push(sTitle);
                    });
                    // console.log(layerName);
                    },
                error: function() {
                    alert("An error occurred while processing XML file.");
                }
            });
        });

        // Called if an error occurs during WMS Capabilities document retrieval
        var logError = function (jqXhr, text, exception) {
            console.log("There was a failure retrieving the capabilities document: " + text + " exception: " + exception);
        };

        $.get(serviceAddress).done(createLayer).fail(logError);

        // console.log(layers);

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        var wwd = new WorldWind.WorldWindow("canvasOne");

        var splitA;

        // // Standard WorldWind layers
        // var layers = [
        //     {layer: new WorldWind.BMNGLayer(), enabled: true},
        //     {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
        //     {layer: new WorldWind.BingAerialLayer(null), enabled: false},
        //     {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: false},
        //     {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
        //     {layer: new WorldWind.CompassLayer(), enabled: true},
        //     {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        //     {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        //     //{layer: new WorldWind.RenderableLayer(wwd), enabled: true, displayName: "PlacemarkC"}
        // ];
        //
        //
        // for (var l = 0; l < layers.length; l++) {
        //     layers[l].layer.enabled = layers[l].enabled;
        //     wwd.addLayer(layers[l].layer);
        // }
        //
        //
        // // Create a layer manager for controlling layer visibility.
        // var layerManager = new LayerManager(wwd);
        //
        // // Web Map Service information from NASA's Near Earth Observations WMS
        // var serviceAddress = "http://cs.aworldbridgelabs.com:8080/geoserver/ows?service=WMS&request=GetCapabilities&version=1.1.1";
        // // Named layer displaying Average Temperature data
        //
        // var layerName = ["City_Smart:Circuit_Direction","City_Smart:FUSE_2points_Kodiak"];
        //
        // var Title = ["0","1","2","3","4","5","6","7","8"];
        //
        // this.layers = wwd.layers;
        //
        //
        // $("#Cityssssmart").click(function() {
        //     if ($('#Cityssssmart').is(":checked")) {
        //         layers.enabled = true;
        //     }
        // });
        //
        //
        // var createLayer = function (xmlDom) {
        //     // Create a WmsCapabilities object from the XML DOM
        //     var wms = new WorldWind.WmsCapabilities(xmlDom);
        //     // Retrieve a WmsLayerCapabilities object by the desired layer name
        //     for (var n = 0; n < layerName.length; n++) {
        //         var NA = layerName[n];
        //         var T = Title[n];
        //
        //         var wmsLayerCapabilities = wms.getNamedLayer(NA);
        //         // Form a configuration object from the WmsLayerCapability object
        //         var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
        //         // Modify the configuration objects title property to a more user friendly title
        //         wmsConfig.title = T;
        //         console.log("s"+wmsConfig);
        //         // Create the WMS Layer from the configuration object
        //         var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
        //
        //         // wmsLayer = WorldWind.WmsLayer(wmsConfig);
        //         // Add the layers to WorldWind and update the layer manager
        //
        //         wwd.addLayer(wmsLayer);
        //
        //         // console.log(wmsLayer);
        //
        //         // layerManager.synchronizeLayerList();
        //     }
        //
        //
        // };

        var CurrentToggleVal;
        var i;
        $('.switch_right').click(function() {
            // console.log("23");
            var SelectedLayers = [];
            var LayerInfo = [];
            var newLatLon = [];

            if ($('.switch_right').is(":checkbox:checked")) {

                $(':checkbox:checked').each(function () {
                    CurrentToggleVal = $(this).val();
                    // alert(CurrentToggleVal);
                    SelectedLayers.push(CurrentToggleVal);
                    // CreatePlacemarkLayer = $(this).val();
                });
                // toggleVal[0];
            }

            // console.log(SelectedLayers);
            $.getJSON( "LayerNCC.json", function (layer) {
                // console.log (SelectedLayers.length);
                for (i = 0; i < SelectedLayers.length; i++) {
                    for (var j = 0; j < layer.length; j++) {
                        if (SelectedLayers[i] === layer[j].Layer_Name) {
                            // console.log(SelectedLayers[i]);
                            LayerInfo.push(layer[j]);
                        }
                    }

                }

                // console.log(LayerInfo);

                FunctionA();

                CreatePlacemarkLayer(splitA);

            });


            var FunctionA = function () {
                for (var k = 0; k < LayerInfo.length; k++) {
                    splitA = LayerInfo[k].Latitude_and_Longitude_Decimal.split(",");
                    newLatLon.push(splitA);

                }
                console.log(newLatLon);
                // for (var g = 0; g < splitA.length; g++) {
                //     var splitB;
                //     splitB = splitA.Latitude_and_Longitude_Decimal.split(",");
                //     console.log(splitB);
                // }
            };

            // SelectedLayers = [];
            // alert ("Selected: " + SelectedLayers[i]);
            //
            // for (var k = 0;k < CreatePlacemarkLayer.length; k++) {
            //     k = toggleVal.length;
            //
            // }
            //
            // for (var i = 0; i < toggleVal.length; i++) {
            //    $.getJSON( "LayerNCC.json", function (data) {
            //        alert(toggleVal[i]);
            //        // data.Site_Name
            //        // alert(data[toggleVal].Latitude_and_Longitude(Decimal))
            //
            //    })
            // }
            // console.log(CreatePlace markLayer(splitA));

        });

        // $.getJSON( "LayerNCC.json", function (dat) {
        //     alert( "Layer Name: " + dat[9].Location);
        //     alert( "Coordinates: " + dat[9].Latitude_and_Longitude_Decimal)
        // });
        //
        //control the second layer
        // $(function(){
        //     $('.switch_right').click(function(){
        //         var val = [];
        //         if ($('.switch_right').is(":checkbox:checked")) {
        //
        //             // console.log("true"+val);
        //
        //             $(':checkbox:checked').each(function () {
        //                 val = $(this).val();
        //                 var str = val+'';
        //                 val = str.split(",");
        //
        //                 for (var a = 0; a < layers.length; a++) {
        //                     for(var i = 0; i < val.length; i++) {
        //                         if (layers[a].displayName === val[i]) {
        //
        //                             layers[a].enabled = true;
        //
        //                         } else if (val.length < 1 ) {
        //                             console.log("error");
        //                         }
        //                     }
        //                 }
        //
        //             });
        //         }
        //
        //         if($('.switch_right').is(":not(:checked)")) {
        //             // console.log("enable:false");
        //             var layer = [];
        //             $(":checkbox:not(:checked)").each(function (i) {
        //                 layer = $(this).val();
        //                 var str = layer+'';
        //                 layer = str.split(",");
        //                 // console.log(str);
        //                 // console.log(layer[i]);
        //
        //
        //                 // console.log(val);
        //                 // console.log("s"+layers[a].displayName);
        //
        //                 for (var a = 0; a < layers.length; a++) {
        //                     for(var l = 0; l < layer.length; l++) {
        //                         if (layers[a].displayName === layer[l]) {
        //
        //                             layers[a].enabled = false;
        //                             console.log("str: " + layers[a].displayName);
        //                             // console.log(layers[a]);
        //                         }
        //                     }
        //                 }
        //
        //             });
        //         }
        //         // $.get(serviceAddress).done(createLayer).fail(logError);
        //     });
        // });
        // // Called asynchronously to parse and create the WMS layer
        // var createLayer = function (xmlDom) {
        //     // Create a WmsCapabilities object from the XML DOM
        //     var wms = new WorldWind.WmsCapabilities(xmlDom);
        //     // Retrieve a WmsLayerCapabilities object by the desired layer name
        //     var wmsLayerCapabilities = wms.getNamedLayer(layerName[1]);
        //     console.log(layerName[0]);
        //     // Form a configuration object from the WmsLayerCapability object
        //     var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
        //     // Modify the configuration objects title property to a more user friendly title
        //     wmsConfig.title = Title[1];
        //      // Create the WMS Layer from the configuration object
        //     var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
        //
        //     // Add the layers to WorldWind and update the layer manager
        //     wwd.addLayer(wmsLayer);
        //     layerManager.synchronizeLayerList();
        // };
        // Called if an error occurs during WMS Capabilities document retrieval
        // var logError = function (jqXhr, text, exception) {
        //     console.log("There was a failure retrieving the capabilities document: " + text + " exception: " + exception);
        // };
        // $.get(serviceAddress).done(createLayer).fail(logError);
        //
        // function myFunction() {
        //This is creating the placemark layer and to connect the placemark to the switch

        var CreatePlacemarkLayer = function (splitB) {
            this.placemark = Placemark;
            this.placemarkAttributes = PlacemarkAttributes;
            this.highlightAttributes = highlightAttributes;
            // var placemarkLayer = new WorldWind.RenderableLayer(LayerInfo[k].Site_Name);
            // var PlacemarkSettings = //Set up the common placemark attributes.
            this.placemarkAttributes.imageScale = 1;
            this.placemarkAttributes.imageOffset = new WorldWind.Offset(
                WorldWind.OFFSET_FRACTION, 0.5,
                WorldWind.OFFSET_FRACTION, 0.5);
            this.placemarkAttributes.imageColor = WorldWind.Color.WHITE;
            // console.log(splitB[0]);
            // this.latitude = splitB[0];
            // console.log(splitB[1]);
            // this.longitude = splitB[1];

            // //Lat and Long variables
            // var lat_long = [
            //     {place:"KHS Wind Turbine", latitude:57.793083, longitude:20},
            //     {place:"KEA Wind Turbine", latitude:0, longitude:0},
            //     {place:"Tuluksak Energy Budget", latitude:10, longitude:10}
            // ];
            //

            // Create the custom image for the placemark.

            var canvas = document.createElement("canvas"),
                ctx2d = canvas.getContext("2d"),
                size = 64, c = size / 2 - 0.5, innerRadius = 5, outerRadius = 20;

            canvas.width = size;
            canvas.height = size;

            var gradient = ctx2d.createRadialGradient(c, c, innerRadius, c, c, outerRadius);
            gradient.addColorStop(0, 'rgb(0, 0, 255');
            gradient.addColorStop(0.5, 'rgb(0, 255, 0)');
            gradient.addColorStop(1, 'rgb(0, 0, 255)');

            ctx2d.fillStyle = gradient;
            ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
            ctx2d.fill();

            // Create the placemark.
            this.placemark = new WorldWind.Placemark(new WorldWind.Position(latitude, longitude, 1e2), false, null);
            //placemark.label = "This is a school" + SitesPL[i].SiteID; // NA,USA,1234
            this.placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

            // Create the placemark attributes for the placemark.
            this.PlacemarkAttributes = new WorldWind.PlacemarkAttributes(PlacemarkAttributes);
            // Wrap the canvas created above in an ImageSource object to specify it as the placemark image source.
            this.placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
            this.placemark.attributes = PlacemarkAttributes;

            // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
            // the default highlight attributes so that all properties are identical except the image scale. You could
            // instead vary the color, image, or other property to control the highlight representation.
            this.highlightAttributes = new WorldWind.PlacemarkAttributes(PlacemarkAttributes);
            highlightAttributes.imageScale = 1.2;
            this.placemark.highlightAttributes = highlightAttributes;

            // // Add the placemark to the layer.
            // placemarkLayer.addRenderable(Placemark);
            //
            // // Add the placemarks layer to the World Window's layer list.
            // wwd.addLayer(placemarkLayer);

        };

        // // Create a layer manager for controlling layer visibility.
        // var layerManger = new LayerManager(wwd);
        //
        //
        // // Now set up to handle highlighting.
        // var highlightController = new WorldWind.HighlightController(wwd);
        //
        //
        // var handleMouseCLK = function (o) {
        //
        //     // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
        //     // the mouse or tap location.
        //     var x = o.clientX,
        //         y = o.clientY;
        //
        //     // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
        //     // relative to the upper left corner of the canvas rather than the upper left corner of the page.
        //
        //     //This is the the Popup Box coordinate finder
        //     var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
        //     console.log(pickList);
        //     for (var q = 0; q < pickList.objects.length; q++) {
        //         var pickedPL = pickList.position[q].latitude;
        //         alert("It's working");
        //         if (pickedPL instanceof WorldWind.Placemark) {
        //
        //             //sitePopUp(pickedPL.label);
        //             //alert("It Worked");
        //
        //             $(document).ready(function () {
        //                 // Make a popup Box after insert popup list items.
        //
        //                 var modal = document.getElementsByClassName('');// Get the modal
        //                 var span = document.getElementsByClassName('');// Get the <span> element that closes the modal
        //
        //                 // When the user double clicks the placemark, open the modal
        //                 modal.style.display = "block";
        //
        //                 // When the user clicks on <span> (x), close the modal
        //                 span.onclick = function () {
        //                     modal.style.display = "none";
        //                 };
        //
        //                 // When the user clicks anywhere outside of the modal, close it
        //                 window.onclick = function (event) {
        //                     if (event.target == modal) {
        //                         modal.style.display = "none";
        //                     }
        //
        //                 }
        //
        //             })
        //         }
        //     }
        //
        //     pickList = [];
        //
        // };
        //
        // // Listen for mouse double clicks placemarks and then pop up a new dialog box.
        // wwd.addEventListener("click", handleMouseCLK);
        //
        // // Listen for taps on mobile devices and then pop up a new dialog box.
        // var tapRecognizer = new WorldWind.TapRecognizer(wwd, handleMouseCLK);
        //
        // var layerList = wwd.layers;

    });
