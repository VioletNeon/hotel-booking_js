const mapFiltersForm = document.querySelector('.map__filters');
const mapFeaturesBox = mapFiltersForm.querySelector('.map__features');
const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');
const mapFeatures = mapFeaturesBox.querySelectorAll('.map__checkbox');
const mapFilters = [housingType, housingPrice, housingRooms, housingGuests, ...mapFeatures];

const MIDDLE_PRICE_FROM = 10000;
const MIDDLE_PRICE_TO = 50000;


const filterCards = ({offer}) => {

  const selectedMapFilters = [housingType.value, housingRooms.value, housingGuests.value, housingPrice.value];
  const checkedFeatures = Array.from(mapFeatures).filter((item) => { return item.checked });

  let rank = 0;
  let matchRank = 0;

  checkedFeatures.forEach((item) => { if (offer.features.includes((item.value))) {rank += 1 }});

  mapFeatures.forEach((item) => { if (item.checked) { matchRank += 1 }});
  selectedMapFilters.forEach((item) => { if (item !== 'any') { matchRank += 1 }});

  const PriceMap = {
    middle: (MIDDLE_PRICE_FROM < offer.price && offer.price < MIDDLE_PRICE_TO),
    low: offer.price <= MIDDLE_PRICE_FROM,
    high: offer.price >= MIDDLE_PRICE_TO,
    any: false,
  };

  if (offer.type === housingType.value) {
    rank += 1;
  }

  if (PriceMap[housingPrice.value]) {
    rank += 1;
  }

  if (offer.guests === (+housingGuests.value)) {
    rank += 1;
  }

  if (offer.rooms === (+housingRooms.value)) {
    rank += 1;
  }

  return rank === matchRank;
};

const onMapFiltersChange = (cb) => {
  mapFilters.forEach((item) => { item.addEventListener('change', cb) });
};

export { filterCards, onMapFiltersChange };
