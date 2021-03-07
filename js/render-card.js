import { someDescriptionAd } from './data.js';

const CARD_BLOCK = document.querySelector('.map__canvas');

const renderPopups = function (cardsArray, blockForRender) {

  // Transform data array in cards array for render
  const NEW_TEMPLATE_POPUPS = cardsArray.map(({author, offer}) => {

    // Get template
    const CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.popup');
    const CARD_OF_ADVERTISEMENT = CARD_TEMPLATE.cloneNode(true);

    // Create fragment
    const CARD_FRAGMENT = document.createDocumentFragment();

    // Write text content in template
    CARD_OF_ADVERTISEMENT.querySelector('.popup__title').textContent = offer.title;
    CARD_OF_ADVERTISEMENT.querySelector('.popup__text--address').textContent = offer.address;
    CARD_OF_ADVERTISEMENT.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    CARD_OF_ADVERTISEMENT.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    CARD_OF_ADVERTISEMENT.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    const OFFER_BUILDINGS = {flat: 'Квартира', bungalow: 'Бунгало', house: 'Дом', palace: 'Дворец'};
    let buildingType = offer.type;
    for (let key in OFFER_BUILDINGS) {
      if (key === offer.type) {
        buildingType = OFFER_BUILDINGS[key];
      }
    }
    CARD_OF_ADVERTISEMENT.querySelector('.popup__type').textContent = buildingType;
    CARD_OF_ADVERTISEMENT.querySelector('.popup__description').textContent = offer.description;

    // Define features in template
    const POPUP_FEATURES = CARD_OF_ADVERTISEMENT.querySelector('.popup__features');
    const POPUP_FEATURE_ITEMS = POPUP_FEATURES.querySelectorAll('.popup__feature');
    for (let i = 0; i < POPUP_FEATURE_ITEMS.length; i++) {
      let matchFeatureItem = false;
      for (let j = 0; j < offer.features.length; j++) {
        if (POPUP_FEATURE_ITEMS[i].classList.contains(`popup__feature--${offer.features[j]}`)) {
          matchFeatureItem = true;
        }
      }
      if (!matchFeatureItem) {
        POPUP_FEATURE_ITEMS[i].remove();
      }
    }

    // Insert photos in template
    const PHOTOS_BOX = CARD_OF_ADVERTISEMENT.querySelector('.popup__photos');
    const PHOTOS_BOX_IMAGE = PHOTOS_BOX.querySelector('.popup__photo');
    offer.photos.length === 0 ? PHOTOS_BOX_IMAGE.remove() : PHOTOS_BOX_IMAGE.src = offer.photos[0];
    if (offer.photos.length > 1) {
      for (let i = 1; i <= offer.photos.length - 1; i++) {
        const SIMILAR_PHOTOS_BOX_IMAGE = PHOTOS_BOX_IMAGE.cloneNode(true);
        SIMILAR_PHOTOS_BOX_IMAGE.src = offer.photos[i];
        PHOTOS_BOX.appendChild(SIMILAR_PHOTOS_BOX_IMAGE);
      }
    }

    // Define avatar
    CARD_OF_ADVERTISEMENT.querySelector('.popup__avatar').src = author.avatar;

    // Append to fragment
    CARD_FRAGMENT.appendChild(CARD_OF_ADVERTISEMENT);
    return CARD_FRAGMENT
  });

  // Render in block
  return blockForRender.appendChild(NEW_TEMPLATE_POPUPS[0]);
}

renderPopups(someDescriptionAd, CARD_BLOCK);
