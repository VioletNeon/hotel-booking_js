import { someDescriptionAd as descriptionsForRender } from './data.js';

const offerBuildings = {flat: 'Квартира', bungalow: 'Бунгало', house: 'Дом', palace: 'Дворец'};

const renderPopups = function (cardsArray) {

  // Transform data array in cards array for render
  const newTemplatePopups = cardsArray.map(({author, offer}) => {

    // Get template
    const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
    const cardOfAdvertisement = cardTemplate.cloneNode(true);

    // Write text content in template
    cardOfAdvertisement.querySelector('.popup__title').textContent = offer.title;
    cardOfAdvertisement.querySelector('.popup__text--address').textContent = offer.address;
    cardOfAdvertisement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    cardOfAdvertisement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    cardOfAdvertisement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    cardOfAdvertisement.querySelector('.popup__type').textContent = offerBuildings[offer.type];
    cardOfAdvertisement.querySelector('.popup__description').textContent = offer.description;

    // Define features in template
    const popupFeatures = cardOfAdvertisement.querySelector('.popup__features');
    popupFeatures.innerHTML = '';
    offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      popupFeatures.appendChild(featureElement);
    });

    // Insert photos in template
    const photosBox = cardOfAdvertisement.querySelector('.popup__photos');
    const photosBoxImage = photosBox.querySelector('.popup__photo');
    photosBoxImage.remove();
    if (offer.photos.length) {
      offer.photos.forEach((photo) => {
        const similarPhotosBoxImage = photosBoxImage.cloneNode(true);
        similarPhotosBoxImage.src = photo;
        photosBox.appendChild(similarPhotosBoxImage);
      });
    }

    // Define avatar
    cardOfAdvertisement.querySelector('.popup__avatar').src = author.avatar;

    return cardOfAdvertisement
  });

  return newTemplatePopups
};

export { descriptionsForRender, renderPopups };
