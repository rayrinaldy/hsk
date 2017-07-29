jQuery(document).ready(function($) {
    //set your google maps parameters
    var $latitude = -6.929695,
        $longitude = 107.5665222,
        $map_zoom = 14,
        bounds = new google.maps.LatLngBounds();

    //google map custom marker icon - .png fallback for IE11
    var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
    var $marker_url = (is_internetExplorer11) ? 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.png' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location_1.svg';

    //define the basic color of your map, plus a value for saturation and brightness
    var $main_color = '#2d313f',
        $saturation = -20,
        $brightness = 5;

    var markers = [
        ['office', -6.929695, 107.5665222],
        ['showroom', -6.9146177, 107.6329294],
        ['bali', -8.701932, 115.1765684],
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
            '<h3>Hegar Sumber Kreasi Office & Workshop</h3>' +
            '<p>Jl. Paralon I No. 1, Cijerah, Kel. Cikondewah Kaler, Kec. Bandung Kulon, Cigondewah Kaler, Bandung Kulon, Kota Bandung, Jawa Barat 40214, Indonesia</p>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<h3>Hegar Sumber Kreasi Showroom</h3>' +
            '<p>Jl. Jend. A. Yani, Kacapiring, Batununggal, Kota Bandung, Jawa Barat 40271, Indonesia</p>' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<h3>Hegar Sumber Kreasi Branch Office</h3>' +
            '<p>Jl. Dewi Sri 98D, Graha Ganesha, Seminyak, Legian, Kuta, Bali 80361, Indonesia</p>' +
            '</div>'
        ]
    ];

    //we define here the style of the map
    var style = [{
            //set saturation for the labels on the map
            elementType: "labels",
            stylers: [{
                saturation: $saturation
            }]
        }, { //poi stands for point of interest - don't show these lables on the map 
            featureType: "poi",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            //don't show highways lables on the map
            featureType: 'road.highway',
            elementType: 'labels',
            stylers: [{
                visibility: "off"
            }]
        }, {
            //don't show local road lables on the map
            featureType: "road.local",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            //don't show arterial road lables on the map
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            //don't show road lables on the map
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "off"
            }]
        },
        //style different elements on the map
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]
        }, {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]
        }, {
            featureType: "poi.sport_complex",
            elementType: "geometry.fill",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]
        }, {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]
        }, {
            featureType: "poi.business",
            elementType: "geometry.fill",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]
        }, {
            featureType: "transit.station",
            elementType: "geometry.fill",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]
        }, {
            featureType: "landscape",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]

        }, {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                hue: $main_color
            }, {
                visibility: "on"
            }, {
                lightness: $brightness
            }, {
                saturation: $saturation
            }]
        }
    ];

    //set google map options
    var map_options = {
            center: new google.maps.LatLng(markers[0][1], markers[0][2]),
            zoom: $map_zoom,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: style,
        }
        //inizialize the map
    var map = new google.maps.Map(document.getElementById('google-container'), map_options);
    //add a custom marker to the map				
    // var marker = new google.maps.Marker({
    //     position: new google.maps.LatLng($latitude, $longitude),
    //     map: map,
    //     visible: true,
    //     icon: $marker_url,
    // });

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(),
        marker, i;

    // Loop through our array of markers & place each one on the map  
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            visible: true,
            icon: $marker_url,
        });

        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                // infoWindow.setContent(infoWindowContent[i][0]);
                // infoWindow.open(map, marker);
                $('address').html(infoWindowContent[i][0]);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        // map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    // var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
    //     this.setZoom(14);
    //     google.maps.event.removeListener(boundsListener);
    // });

    //add custom buttons for the zoom-in/zoom-out on the map
    function CustomZoomControl(controlDiv, map) {
        //grap the zoom elements from the DOM and insert them in the map 
        var controlUIzoomIn = document.getElementById('cd-zoom-in'),
            controlUIzoomOut = document.getElementById('cd-zoom-out');
        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
            map.setZoom(map.getZoom() + 1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
            map.setZoom(map.getZoom() - 1)
        });
    }

    var zoomControlDiv = document.createElement('div');
    var zoomControl = new CustomZoomControl(zoomControlDiv, map);

    //insert the zoom div on the top left of the map
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
    // google.maps.event.trigger(markers[1], 'click');

    function getCoords(position) {
        var text = position.replace(/[()]/g, '').split(", ");
        var lat = Number(text[0]);
        var lng = Number(text[1]);

        return {
            lat: lat,
            lng: lng
        };
    }


    $('.maps-nav li').each(function(i, el) {
    	$(this).on('click', function() {
	        $(this).removeClass('active');
	        $(this).addClass('active');
	        var id = $(this).attr('id');
	        // console.log(id);
	        // $('#active').animate({
	        //     'margin-left': $(this).offset().left
	        // });
	        map.panTo(new google.maps.LatLng(markers[i][1], markers[i][2]));
	        $('address').html(infoWindowContent[i][0]);
	    });
    });
    
    $('#office').trigger('click');
});