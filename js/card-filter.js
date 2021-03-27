const mapFiltersForm = document.querySelector('.map__filters');
const mapFeaturesBox = mapFiltersForm.querySelector('.map__features');
const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');
const mapFeatures = mapFeaturesBox.querySelectorAll('.map__checkbox');
const mapFilters = [housingType, housingPrice, housingRooms, housingGuests, ...mapFeatures];


const filterCards = ({offer}) => {

  const selectedMapFilters = [housingType.value, housingRooms.value, housingGuests.value, housingPrice.value];
  const checkedFeatures = Array.from(mapFeatures).filter((item) => { if (item.checked) { return true }});

  let rank = 0;
  let matchRank = 0;

  checkedFeatures.forEach((item) => { if (offer.features.includes((item.value))) {rank += 1 }});

  mapFeatures.forEach((item) => { if (item.checked) { matchRank += 1 }});
  selectedMapFilters.forEach((item) => { if (item !== 'any') { matchRank += 1 }});

  const PriceMap = {
    middle: (10000 < offer.price && offer.price < 50000),
    low: offer.price <= 10000,
    high: offer.price >= 50000,
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
