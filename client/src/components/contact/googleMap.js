import React, {useEffect, useRef} from 'react';

import LogoMarker from "../../assets/images/logoMarkerDark.svg";

// Variables
const GOOGLE_MAP_API_KEY = 'AIzaSyDdXBTcMBFHexWDQh6gZa37ehtDNa1nf2U';
const myLocation = {
	lat: 6.6765,
	lng: 3.2920
};

// styles
const styleDark = [
	{
		"featureType": "all",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "simplified"
			},
			{
				"hue": "#bc00ff"
			},
			{
				"saturation": "0"
			}
		]
	},
	{
		"featureType": "administrative",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "simplified"
			}
		]
	},
	{
		"featureType": "administrative",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#e8b8f9"
			}
		]
	},
	{
		"featureType": "administrative.country",
		"elementType": "labels",
		"stylers": [
			{
				"color": "#ff0000"
			}
		]
	},
	{
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"visibility": "simplified"
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "all",
		"stylers": [
			{
				"color": "#3e114e"
			},
			{
				"visibility": "simplified"
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "labels",
		"stylers": [
			{
				"visibility": "off"
			},
			{
				"color": "#a02aca"
			}
		]
	},
	{
		"featureType": "landscape.natural",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "simplified"
			},
			{
				"color": "#2e093b"
			}
		]
	},
	{
		"featureType": "landscape.natural",
		"elementType": "labels.text",
		"stylers": [
			{
				"color": "#9e1010"
			},
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "landscape.natural",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#ff0000"
			}
		]
	},
	{
		"featureType": "landscape.natural.landcover",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "simplified"
			},
			{
				"color": "#58176e"
			}
		]
	},
	{
		"featureType": "landscape.natural.landcover",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"visibility": "simplified"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "poi.business",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "all",
		"stylers": [
			{
				"saturation": -100
			},
			{
				"lightness": 45
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
			{
				"visibility": "simplified"
			},
			{
				"color": "#a02aca"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "labels",
		"stylers": [
			{
				"visibility": "simplified"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#d180ee"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"visibility": "simplified"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "simplified"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
			{
				"visibility": "simplified"
			},
			{
				"color": "#a02aca"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "labels",
		"stylers": [
			{
				"visibility": "off"
			},
			{
				"color": "#ff0000"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "labels.text",
		"stylers": [
			{
				"color": "#a02aca"
			},
			{
				"visibility": "simplified"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#cc81e7"
			},
			{
				"visibility": "simplified"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"visibility": "simplified"
			},
			{
				"hue": "#bc00ff"
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#6d2388"
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#c46ce3"
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "labels.icon",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "transit",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "all",
		"stylers": [
			{
				"color": "#b7918f"
			},
			{
				"visibility": "on"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#280b33"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels",
		"stylers": [
			{
				"visibility": "simplified"
			},
			{
				"color": "#a02aca"
			}
		]
	}
];
const mapDivStyles = {
	width: '100%',
	height: '100%',
};

const GoogleMaps = () => {
	// refs
	const googleMapRef = useRef('');
	const googleMap = useRef(null);
	const marker = useRef(null);

	// useEffect Hook
	useEffect(() => {
		// helper functions
		const createGoogleMap = () =>
			new window.google.maps.Map(googleMapRef.current, {
				backgroundColor: 'transparent',
				zoom: 12,
				center: myLocation,
				disableDefaultUI: true,
				styles: styleDark
			});

		const createMarker = () =>
			new window.google.maps.Marker({
				position: myLocation,
				map: googleMap.current,
				icon: LogoMarker
			});

		const gMapScript = url => {
			let body = document.body.children;
			let gMapInDom = false;
			for (let i=0; i<body.length; i++) {
				if (body[i].outerHTML.includes('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDdXBTcMBFHexWDQh6gZa37ehtDNa1nf2U&amp;libraries=places" async=""></script>')) {
					gMapInDom = true;
				}
			}
			if (!gMapInDom) {
				const googleMapScript = document.createElement('script');
				googleMapScript.src = url;
				googleMapScript.async = true;
				document.body.appendChild(googleMapScript);

				googleMapScript.addEventListener('load', () => {
					googleMap.current = createGoogleMap();
					marker.current = createMarker()
				});
			} else {
					googleMap.current = createGoogleMap();
					marker.current = createMarker()
			}
		};

		const url = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
		gMapScript(url);
	}, []);

	return (
		<div
			id="google-map"
			ref={googleMapRef}
			style={mapDivStyles}
		/>
	)

};

export default GoogleMaps