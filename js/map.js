/* global L:readonly */

import { disableAllFormBoxes, ableAdFormBox, ableMapFormBox } from './render-ability-of-forms.js';
import { getNewTemplateCard } from './get-new-template-card.js';
import { getData } from './server-request-api.js';
import { showError } from './utils.js';

const LATITUDE_VALUE = 35.66065;
const LONGITUDE_VALUE = 139.78310;
const WIDTH_MAIN_ICON = 52;
const HEIGHT_MAIN_ICON = 52;
const FLOATING_POINT = 5;
const WIDTH_USUAL_ICON = 52;
const HEIGHT_USUAL_ICON = 52;

// Input for define address coordinates
const inputAddress = document.querySelector('#address');

// Render disabled form before map loading
disableAllFormBoxes();

// Create box-map and get able ad-form
const map = L.map('map-canvas')
  .on('load',
    ableAdFormBox)
  .setView({
    lat: LATITUDE_VALUE,
    lng: LONGITUDE_VALUE,
  }, 12);

// Add map layer to box-map
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Create main icon
const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [WIDTH_MAIN_ICON, HEIGHT_MAIN_ICON],
  iconAnchor: [WIDTH_MAIN_ICON/2, HEIGHT_MAIN_ICON],
});

// Add marker attributes
const marker = L.marker(
  {
    lat: LATITUDE_VALUE,
    lng: LONGITUDE_VALUE,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

marker.addTo(map);

// Set default coordinates of main icon
const setDefaultCoordinatesOfMainMarker = function () {
  const latLng = L.latLng(LATITUDE_VALUE, LONGITUDE_VALUE);
  marker.setLatLng(latLng);
};

// Get cut coordinates of main icon
const getCoordinatesMainIcon = function (target) {
  const coordinateMainIconX = target.getLatLng().lat.toFixed(FLOATING_POINT);
  const coordinateMainIconY = target.getLatLng().lng.toFixed(FLOATING_POINT);
  return `${coordinateMainIconX}, ${coordinateMainIconY}`;
};

// Default coordinates of main icon
inputAddress.value = getCoordinatesMainIcon(marker);

// Redefine current coordinates for rendering through address input
marker.on('move', (evt) => {
  const newCoordinatesMainIcon = evt.target;
  inputAddress.value = getCoordinatesMainIcon(newCoordinatesMainIcon);
});

// Render usual makers with popups
const renderUsualMarkers = function (points) {
  points.forEach((point) => {
    const lat = point.location.lat;
    const lng = point.location.lng;
    const usualIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [WIDTH_USUAL_ICON, HEIGHT_USUAL_ICON],
      iconAnchor: [WIDTH_USUAL_ICON/2, HEIGHT_USUAL_ICON],
    });

    const usualMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        usualIcon,
      },
    );

    usualMarker
      .addTo(map)
      .bindPopup(
        getNewTemplateCard(point),
        {
          keepInView: true,
        },
      );
  })
  ableMapFormBox();
};

// Load cards of usual markers from server
getData(renderUsualMarkers, showError);

export { renderUsualMarkers, setDefaultCoordinatesOfMainMarker };
