/* global L:readonly */

import { getDisabledAllFormBoxes, getAbleAdFormBox, getAbleMapFormBox } from './render-ability-of-forms.js';
import { descriptionsForRender, renderPopups } from './render-card.js';

// Input for define address coordinates
const inputAddress = document.querySelector('#address');

// Render disabled form before map loading
getDisabledAllFormBoxes();

// Create box-map and get able ad-form
const map = L.map('map-canvas')
  .on('load',
    getAbleAdFormBox)
  .setView({
    lat: 35.66065,
    lng: 139.78310,
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
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Add marker attributes
const marker = L.marker(
  {
    lat: 35.66065,
    lng: 139.78310,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

marker.addTo(map);

// Get cut coordinates of main icon
const getCoordinatesMainIcon = function (target) {
  const coordinateMainIconX = target.getLatLng().lat.toFixed(5);
  const coordinateMainIconY = target.getLatLng().lng.toFixed(5);
  return `${coordinateMainIconX}, ${coordinateMainIconY}`;
};

// Default coordinates of main icon
inputAddress.value = getCoordinatesMainIcon(marker);

// Redefine current coordinates for rendering through address input
marker.on('moveend', (evt) => {
  const newCoordinatesMainIcon = evt.target;
  inputAddress.value = getCoordinatesMainIcon(newCoordinatesMainIcon);
});

// Render usual makers with popups
const renderUsualMarkers = function (points, popups) {
  for (let i = 0; i < points.length; i++) {
    const lat = points[i].location.x;
    const lng = points[i].location.y;
    const popup = popups[i];
    const usualIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
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
        popup,
        {
          keepInView: true,
        },
      );
  }
  getAbleMapFormBox();
};

// Get rendered usual markers with popups
renderUsualMarkers(descriptionsForRender, renderPopups(descriptionsForRender));
