/* global L:readonly */

import { disableAllFormBoxes, makeAbleAdFormBox, makeAbleMapFormBox } from './render-ability-of-forms.js';
import { getNewTemplateCard } from './get-new-template-card.js';
import { getData } from './server-request-api.js';
import { showError, debounce } from './utils.js';
import { onMapFiltersChange, filterCards } from './card-filter.js';
import { onResetButtonClick } from './send-form.js';

const LATITUDE_VALUE = 35.66065;
const LONGITUDE_VALUE = 139.78310;
const WIDTH_MAIN_ICON = 52;
const HEIGHT_MAIN_ICON = 52;
const FLOATING_POINT = 5;
const WIDTH_USUAL_ICON = 52;
const HEIGHT_USUAL_ICON = 52;
const SIMILAR_CARDS_COUNT = 10;
const RERENDER_DELAY = 500;

// Input for define address coordinates
const inputAddress = document.querySelector('#address');

// Render disabled form before map loading
disableAllFormBoxes();

// Create box-map and get able ad-form
const map = L.map('map-canvas')
  .on('load',
    makeAbleAdFormBox)
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
const mainMarker = L.marker(
  {
    lat: LATITUDE_VALUE,
    lng: LONGITUDE_VALUE,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

// Set default coordinates of main icon
const setDefaultCoordinatesOfMainMarker = () => {
  const latLng = L.latLng(LATITUDE_VALUE, LONGITUDE_VALUE);
  mainMarker.setLatLng(latLng);
};

// Get cut coordinates of main icon
const getCoordinatesMainIcon = (target) => {
  const coordinateMainIconX = target.getLatLng().lat.toFixed(FLOATING_POINT);
  const coordinateMainIconY = target.getLatLng().lng.toFixed(FLOATING_POINT);
  return `${coordinateMainIconX}, ${coordinateMainIconY}`;
};

// Default coordinates of main icon
inputAddress.value = getCoordinatesMainIcon(mainMarker);

// Redefine current coordinates for rendering through address input
mainMarker.on('move', (evt) => {
  const newCoordinatesMainIcon = evt.target;
  inputAddress.value = getCoordinatesMainIcon(newCoordinatesMainIcon);
});

const similarMarkers = [];

const getFilterCards = (points) => {
  let cardsArray = [];
  for (let i = 0; i < points.length; i++) {
    if (filterCards(points[i])) {
      cardsArray.push(points[i]);
    } else if (cardsArray.length === SIMILAR_CARDS_COUNT) { break }
  }
  return cardsArray
};

// Render usual markers with popups
const renderUsualMarkers = (points) => {

  similarMarkers.forEach((item) => {
    map.removeLayer(item);
  });

  getFilterCards(points)
    .forEach((point) => {
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

      similarMarkers.push(usualMarker);

      usualMarker
        .addTo(map)
        .bindPopup(
          getNewTemplateCard(point),
          {
            keepInView: true,
          },
        );
    })
  makeAbleMapFormBox();
};

// Load cards of usual markers from server

const loadCards = () => {
  getData((cards) => {
    renderUsualMarkers(cards);
    onMapFiltersChange(debounce(() => renderUsualMarkers(cards), RERENDER_DELAY));
    onResetButtonClick(cards);
  }, showError);
};

loadCards();

export { renderUsualMarkers, setDefaultCoordinatesOfMainMarker, loadCards };
