mapboxgl.accessToken = 'pk.eyJ1IjoieWFjb25zdHJ1Y3QiLCJhIjoiY2l6NDFpN3k1MDAyZjJxbHdhcHU2eHQ0ZyJ9.8TtgxnHPThgkyXRDGGYMlQ';

var start = [37.642524, 55.733991];
var end = [37.642524, 55.733991];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/yaconstruct/cjx39riro074v1dpkcudfer4w',
    center: [37.642524, 55.7350],
    zoom: 12.05
});


var radiusYa = 0.00005;
 
function pointOnCircle(angle) {
return {
"type": "Point",
"coordinates": [
37.641694 + Math.cos(angle)*0 ,
55.734704 + Math.sin(angle)*radiusYa
]
};
}

var isAtStart = true;

var framesPerSecond = 10000; 
var initialOpacity = 0.1;
var opacity = initialOpacity;
var initialRadius = 100;
var radius = initialRadius;
var maxRadius = 250;


var speedFactor = 30; // number of frames per longitude degree
var animation; // to store and cancel the animation
var startTime = 0;
var progress = 0; // progress = timestamp - startTime
var resetTime = false;



const geojson3 = {
	"type": "FeatureCollection",
	"features": [{
	"type": "Feature",
	"geometry": {
	"type": "LineString",
	"coordinates": [
          [
            37.64170289039612,
            55.73324805534146
          ],
          [
            37.64234662055969,
            55.7335984221667
          ],
          [
            37.64370918273926,
            55.734335390396815
          ],
          [
            37.64381647109985,
            55.734383715696296
          ],
          [
            37.644020318984985,
            55.73431575822681
          ],
          [
            37.64421075582504,
            55.734314248059476
          ],
          [
            37.64436364173889,
            55.73435351239113
          ],
          [
            37.645254135131836,
            55.73499381745656
          ],
          [
            37.64596223831177,
            55.7354951810719
          ],
          [
            37.64618754386902,
            55.73560390968091
          ],
          [
            37.64617681503296,
            55.73580324467746
          ],
          [
            37.646015882492065,
            55.73611130585164
          ],
          [
            37.64584422111511,
            55.7363227189761
          ],
          [
            37.64523267745971,
            55.7359663361902
          ],
          [
            37.643998861312866,
            55.735132750187745
          ],
          [
            37.643558979034424,
            55.7348126001075
          ],
          [
            37.64308154582977,
            55.73448942708031
          ],
          [
            37.6426738500595,
            55.734123966508164
          ],
          [
            37.642534375190735,
            55.73401825413439
          ]
        ]
	}
	}]
}

const geojson2 = {
	"type": "FeatureCollection",
	"features": [{
	"type": "Feature",
	"geometry": {
	"type": "LineString",
	"coordinates": [
          [
            37.642250061035156,
            55.73669117911308
          ],
          [
            37.642807960510254,
            55.73536229013844
          ],
          [
            37.64316201210022,
            55.7345709756667
          ],
          [
            37.642770409584045,
            55.734202495514765
          ],
          [
            37.642523646354675,
            55.73400617270202
          ]
        ]
	}
	}]
}

const geojson = {
	"type": "FeatureCollection",
  

	"features": [{
	"type": "Feature",
	"geometry": {
	"type": "LineString",
	"coordinates": [
          [
            37.643558979034424,
            55.73482166099493
          ],
          [
            37.64334976673126,
            55.73467668654358
          ],
          [
            37.64314591884613,
            55.73452869123579
          ],
          [
            37.64290452003479,
            55.734281024363405
          ],
          [
            37.64270603656769,
            55.73409678335368
          ],
          [
            37.642523646354675,
            55.73400919306045
          ]
        ]
	}
	}]
}

const steps = 200;
let progressturf = 0;

const steps2 = 400;
let progressturf2 = 0;

const steps3 = 400;
let progressturf3= 0;

const animateGeojson = {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': []
        }
      }]
    };

	const animateGeojson2 = {
    'type': 'FeatureCollection',
    'features': [{
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': []
      }
    }]
  };

	const animateGeojson3 = {
    'type': 'FeatureCollection',
    'features': [{
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': []
      }
    }]
  };

function addDataLayer() {
  map.addSource('circleData', {
    type: 'geojson',
    data: {
        type: 'Point',
        coordinates: [37.642524, 55.733991]
    },
  });
	map.addLayer({
  	'id': 'line-animation1',
  	'type': 'line',
  	'source': {
  	'type': 'geojson',
    'lineMetrics': true,
  	'data': geojson
  	},
  	'layout': {
  	'line-cap': 'round',
  	'line-join': 'round'
  	},
  	'paint': {
      'line-gradient': [
      'interpolate',
      ['linear'],
      ['line-progress'],
      0, "#3F96F3",
      
      1, "#CCCCCC"
      ],

  	//'line-color': '#FAF8F0',
		'line-blur': 3,
  	'line-width': 8,
  	'line-opacity': 0
		}
	});
	map.addLayer({
  	'id': 'line-animation',
  	'type': 'line',
  	'source': {
  	'type': 'geojson',
    'lineMetrics': true,
  	'data': geojson
  	},
  	'layout': {
  	'line-cap': 'round',
  	'line-join': 'round'
  	},
  	'paint': {'line-gradient': [
      'interpolate',
      ['linear'],
      ['line-progress'],
      0, "#fff",
      
      1, "#0596FA"
      ],
      
  	//'line-color': '#F1EEDB',
  	'line-width': 4,
  	'line-opacity': 1
		}
	});
	map.addLayer({
  	'id': 'line-animation3',
  	'type': 'line',
  	'source': {
  	'type': 'geojson',
    'lineMetrics': true,
  	'data': geojson3
  	},
  	'layout': {
  	'line-cap': 'round',
  	'line-join': 'round',
		'visibility': 'none'
  	},
  	'paint': {
      'line-gradient': [
      'interpolate',
      ['linear'],
      ['line-progress'],
      0, "#fff",
      
      1, "#0596FA"
      ],
  	//'line-color': '#F1EEDB',
  	'line-width': 4,
  	'line-opacity': 1
		}
	});
	map.addLayer({
  	'id': 'line-animation2',
  	'type': 'line',
  	'source': {
  	'type': 'geojson',
    'lineMetrics': true,
  	'data': geojson2
  	},
  	'layout': {
  	'line-cap': 'round',
  	'line-join': 'round',
		'visibility': 'none'
  	},
  	'paint': {
      'line-gradient': [
      'interpolate',
      ['linear'],
      ['line-progress'],
       0, "#fff",
      
      1, "#0596FA"
      ],
  	//'line-color': '#F1EEDB',
  	'line-width': 4,
  	'line-opacity': 1
		}
	});
	map.loadImage('https://raw.githubusercontent.com/lena-emaya/taxi-search-prototype/master/data/taxi.png', function(error, image) {
    if (error) throw error;
    map.addImage('taxi', image);
    map.addLayer({
    	"id": "taxi1",
    	"type": "symbol",
    	"source": {
    	"type": "geojson",
    	"data": {
    	"type": "FeatureCollection",
    	"features": [{
    	"type": "Feature",
    	"geometry": {
    	"type": "Point",
    	"coordinates": [37.643558979034424,
    	            55.73482166099493]
    	}
    	}]
    	}
    	},
    	"layout": {
    	"icon-image": "taxi",
    	"icon-size": 0.07,
    	"icon-rotate": 225
    }
    });
		map.addLayer({
    	"id": "taxi2",
    	"type": "symbol",
    	"source": {
    	"type": "geojson",
    	"data": {
    	"type": "FeatureCollection",
    	"features": [{
    	"type": "Feature",
    	"geometry": {
    	"type": "Point",
    	"coordinates": [ 37.642250061035156,
            55.73669117911308]
    	}
    	}]
    	}
    	},
    	"layout": {
    	"icon-image": "taxi",
    	"icon-size": 0.07,
    	"icon-rotate": 170
    }
    });
		map.addLayer({
    	"id": "taxi3",
    	"type": "symbol",
    	"source": {
    	"type": "geojson",
    	"data": {
    	"type": "FeatureCollection",
    	"features": [{
    	"type": "Feature",
    	"geometry": {
    	"type": "Point",
    	"coordinates": [ 37.64170289039612,
            55.73324805534146]
    	}
    	}]
    	}
    	},
    	"layout": {
    	"icon-image": "taxi",
    	"icon-size": 0.07,
    	"icon-rotate": 45
    }
    });
	});
	map.addLayer({
    id: 'data',
    type: 'circle',
    source: 'circleData',
    paint: {
        "circle-radius": initialRadius,
        "circle-radius-transition": {duration: 0},
        "circle-opacity-transition": {duration: 0},
        "circle-color": "rgba(0,0,0,0)",
        "circle-stroke-color": "#0596FA", 
        "circle-stroke-width": 4,
        "circle-blur": 0.3,
        "circle-stroke-opacity": 0.5
			
    },
  });
  map.addLayer({
    id: 'data2',
    type: 'circle',
    source: 'circleData',
    paint: {
        "circle-radius": 17,
        "circle-blur": 1,
        "circle-color": "#B3B3B3"
			
    },
  });
  map.addLayer({
    id: 'data1',
    type: 'symbol',
    source: 'circleData',
		layout: {
			'visibility': 'none',
			'icon-image': "main"
		},
    paint: {
      
    }
  });
  

 
	
}

map.on('load', function () {
	map.addSource('routeline', {
    type: 'geojson',
		lineMetrics: true,
    data: {
        type: 'LineString',
        coordinates: [
          [
            37.642550468444824,
            55.73401523377664
          ],
          [
            37.64247536659241,
            55.73391858220548
          ],
          [
            37.64221787452698,
            55.73380984890187
          ],
          [
            37.642099857330315,
            55.733894419275295
          ],
          [
            37.640769481658936,
            55.73585760859076
          ],
          [
            37.640254497528076,
            55.73663681636078
          ],
          [
            37.6396107673645,
            55.737778418258344
          ],
          [
            37.63937473297119,
            55.73844282727089
          ],
          [
            37.63931035995483,
            55.739143464522186
          ],
          [
            37.63922452926636,
            55.74009776054474
          ],
          [
            37.63907432556152,
            55.74042390699945
          ],
          [
            37.63748645782471,
            55.74269477712104
          ],
          [
            37.635297775268555,
            55.74479642214276
          ],
          [
            37.635812759399414,
            55.74512252932866
          ],
          [
            37.6371431350708,
            55.745943824239376
          ],
          [
            37.63883829116821,
            55.747067037819136
          ],
          [
            37.64044761657715,
            55.748250604236276
          ],
          [
            37.641316652297974,
            55.748872566073736
          ],
          [
            37.64146685600281,
            55.749168447350804
          ],
          [
            37.64165997505188,
            55.749524709584264
          ],
          [
            37.642067670822144,
            55.749989657097
          ],
          [
            37.64236807823181,
            55.75027949170373
          ],
          [
            37.64270067214966,
            55.75046667540944
          ],
          [
            37.6422393321991,
            55.75068404890833
          ],
          [
            37.639031410217285,
            55.75320187033113
          ],
          [
            37.63909578323364,
            55.75331054961135
          ]
        ]
    }
  });
	map.addSource('a', {
    type: 'geojson',
    data: {
        type: 'Point',
        coordinates: [37.642524, 55.733991]
    }
  });
	map.addSource('b', {
    type: 'geojson',
    data: {
        type: 'Point',
        coordinates: [37.6390957832, 55.7532803609]
    }
  });  
	map.addLayer({
    id: 'routeline-stroke',
    type: 'line',
    source: 'routeline',
		layout: {
			'visibility': 'visible'
		},
    paint: {
      'line-width': [
        "interpolate",
        ["linear"],
        ["zoom"],
        9,
        3,
        22,
        10
      ],
      // 'line-gradient' must be specified using an expression
      // with the special 'line-progress' property
      'line-color': "#fff"
		},
		layout: {
			'line-cap': 'round',
			'line-join': 'round'
		}
  });
	map.addLayer({
    id: 'routeline',
    type: 'line',
    source: 'routeline',
		layout: {
			'visibility': 'visible'
		},
    paint: {
      'line-width': [
        "interpolate",
        ["linear"],
        ["zoom"],
        9,
        1.5,
        22,
        6
      ],
      // 'line-gradient' must be specified using an expression
      // with the special 'line-progress' property
      'line-gradient': [
      'interpolate',
      ['linear'],
      ['line-progress'],
      0, "#1CC052",
      0.1, "#1CC052",
      0.3, "#FCE000",
      0.5, "#1CC052",
      0.7, "#EB001B",
      1, "#FCE000"
      ]
		},
		layout: {
			'line-cap': 'round',
			'line-join': 'round'
		}
  });
	map.addLayer({
    id: 'a',
    type: 'symbol',
    source: 'a',
		layout: {
			"icon-size": 0.8,
			"icon-image": "location"
		},
    paint: {
      
    },
  });
	map.addLayer({
    id: 'b',
    type: 'circle',
    source: 'b',
		
    paint: {
      'circle-radius': 2,
      'circle-stroke-width': 3,
      'circle-color': '#fff',
      'circle-stroke-color': '#0596FA'
    }
  });
  map.addLayer({
    	"id": "taxi9",
    	"type": "circle",
    	"source": {
    	"type": "geojson",
    	"data": {
    	"type": "FeatureCollection",
    	"features": [{
    	"type": "Feature",
    	"geometry": {
    	"type": "Point",
    	"coordinates": [ 37.642524, 55.733991]
    	}
    	}]
    	}
    	},
    	"paint": {
    	"circle-radius": 400,
    	"circle-color": "#fff",
      "circle-opacity": 0
    }
    });
});

	
document.getElementById('summary').addEventListener('click', function() {
  
    function hideMenu() {
        document.getElementById('summary').style.display = 'none';
        document.getElementById('search').style.display = 'block';
      }
      hideMenu()
	
  map.jumpTo({
		center:	[37.642524, 55.733991],
		zoom: 17.05
	});
	

	map.setStyle('mapbox://styles/yaconstruct/cjzb3ss3z07np1cpcz875vgb9', true);
	
	
	map.on('style.load', function () {
  // Triggered when `setStyle` is called.
	// Marker animation
  	addDataLayer();
   
	

	  function animateMarker1(timestamp) {
      setTimeout(function(){
        requestAnimationFrame(animateMarker1);
        radius += ([maxRadius] - radius) / framesPerSecond;
        
        opacity -= ( .9 / framesPerSecond );
        map.setPaintProperty('data', 'circle-radius',
          radius);
        map.setPaintProperty('data', 'circle-opacity', opacity);
       
        
        if (opacity <= 0) {
            radius = initialRadius;
            opacity = initialOpacity;
        } 
      }, 3000 / framesPerSecond);
    }
  	animateMarker1(0);

		var radiusYa = 0.00001;
 
    function pointOnCircle(angle) {
    return {
    "type": "Point",
    "coordinates": [
    37.642524 + Math.cos(angle)*0 ,
    55.733991 + Math.sin(angle)*radiusYa
    ]
    };
    }

    map.addSource('point', {
"type": "geojson",
"data": pointOnCircle(0)
});
 
map.addLayer({
"id": "point",
"source": "point",
"type": "symbol",
layout: {
			'visibility': 'visible',
			'icon-image': "main"
		}
});

function animateMarker(timestamp) {
// Update the data to a new position based on the animation timestamp. The
// divisor in the expression `timestamp / 1000` controls the animation speed.
map.getSource('point').setData(pointOnCircle(timestamp / 1000));
 
// Request the next frame of the animation.
requestAnimationFrame(animateMarker);
}
 
// Start the animation.
animateMarker(0);

		
		//Line animation
		const routeLength = turf.length(geojson, { units: 'kilometers' });
    const route = [];

    for (let i = 0; i < routeLength; i += (routeLength / steps)) {
      const segment = turf.along(geojson.features[0], i, { units: 'kilometers' });
      route.push(segment.geometry.coordinates);
    }

    // animated in a circle as a sine wave along the map.
    const animateLine = () => {
      if (progressturf === steps - 1) {
        cancelAnimationFrame(animation);
				map.setLayoutProperty('line-animation', 'visibility', 'none');
				map.setLayoutProperty('line-animation1', 'visibility', 'none');
				map.setLayoutProperty('line-animation3', 'visibility', 'none');
				map.setLayoutProperty('line-animation2', 'visibility', 'visible');

///
		//Line animation
		const routeLength2 = turf.length(geojson2, { units: 'kilometers' });
    const route2 = [];

    for (let i = 0; i < routeLength2; i += (routeLength2 / steps2)) {
      const segment2 = turf.along(geojson2.features[0], i, { units: 'kilometers' });
      route2.push(segment2.geometry.coordinates);
    }

    // animated in a circle as a sine wave along the map.
    const animateLine2 = () => {
      if (progressturf2 === steps2 - 1) {
        cancelAnimationFrame(animation2);
				map.setLayoutProperty('line-animation2', 'visibility', 'none');
				map.setLayoutProperty('line-animation3', 'visibility', 'visible');

				///
				//Line animation
				const routeLength3 = turf.length(geojson3, { units: 'kilometers' });
   			 const route3 = [];			

   			 for (let i = 0; i < routeLength3; i += (routeLength3 / steps3)) {
   			   const segment3 = turf.along(geojson3.features[0], i, { units: 'kilometers' });
   			   route3.push(segment3.geometry.coordinates);
   			 }			

   			 // animated in a circle as a sine wave along the map.
   			 const animateLine3= () => {
   			   if (progressturf3 === steps3 - 1) {
   			     cancelAnimationFrame(animation3);
                        map.setLayoutProperty('line-animation3', 'visibility', 'none');
                       
                        map.setStyle('mapbox://styles/yaconstruct/cjx39riro074v1dpkcudfer4w', true);
                        
                        map.loadImage('https://raw.githubusercontent.com/lena-emaya/taxi-search-prototype/master/data/taxi.png', function(error, image) {
    if (error) throw error;
    map.addImage('taxi_new', image);
    map.addLayer({
    	"id": "taxi_new",
    	"type": "symbol",
    	"source": {
    	"type": "geojson",
    	"data": {
    	"type": "FeatureCollection",
    	"features": [{
    	"type": "Feature",
    	"geometry": {
    	"type": "Point",
    	"coordinates": [37.643558979034424,
    	            55.73482166099493]
    	}
    	}]
    	}
    	},
    	"layout": {
    	"icon-image": "taxi_new",
    	"icon-size": 0.07,
    	"icon-rotate": 225
    }
    })});
    map.addSource('a_new', {
        type: 'geojson',
        data: {
            type: 'Point',
            coordinates: [37.642524, 55.733991]
        }
      });
      map.addLayer({
        id: 'a_new',
        type: 'symbol',
        source: 'a_new',
            layout: {
                "icon-size": 0.8,
                "icon-image": "location"
            },
        paint: {
          
        },
      });
                        
                        function hideMenu2() {
                            document.getElementById('search').style.display = 'none';
                            document.getElementById('driving').style.display = 'block';
                          }
                          hideMenu2()
                          document.getElementById('driving').addEventListener('click', function() {
                            
                              
                                location.reload();
                              
                          })
                         
                    return;
                    
   			   } else {
   			     progressturf3 += 1;
   			   }			

   			   // append new coordinates to the lineString
   			   animateGeojson3.features[0].geometry.coordinates.push(route3[progressturf3]);
   			   // then update the map
   			   map.getSource('line-animation3').setData(animateGeojson3);			

   			   // Request the next frame of the animation.
   			   animation3 = requestAnimationFrame(animateLine3);
   			 };			

                animateLine3();
                
				///

        return;
      } else {
        progressturf2 += 1;
      }

      // append new coordinates to the lineString
      animateGeojson2.features[0].geometry.coordinates.push(route2[progressturf2]);
      // then update the map
      map.getSource('line-animation2').setData(animateGeojson2);

      // Request the next frame of the animation.
      animation2 = requestAnimationFrame(animateLine2);
    };

    animateLine2();
///

        return;
      } else {
        progressturf += 1;
      }

      // append new coordinates to the lineString
      animateGeojson.features[0].geometry.coordinates.push(route[progressturf]);
      
      // then update the map
      map.getSource('line-animation').setData(animateGeojson);
			map.getSource('line-animation1').setData(animateGeojson);
      // Request the next frame of the animation.
      animation = requestAnimationFrame(animateLine);
      
    };

    animateLine();
	});
	
	//Flyto animation
  var target = isAtStart ? end : start;
  isAtStart = !isAtStart;
   
  map.flyTo({
  	center: target,
  	zoom: 14.75,
  	bearing: 0,
  	speed: 0.08, 
  	curve: 1,
  	easing: function (t) { return t; }
  });



});



