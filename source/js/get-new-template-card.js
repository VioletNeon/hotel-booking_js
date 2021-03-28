const offerBuildings = {flat: 'Квартира', bungalow: 'Бунгало', house: 'Дом', palace: 'Дворец'};

const getNewTemplateCard = ({author, offer}) => {

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

  // Define description in template
  const popupDescription = cardOfAdvertisement.querySelector('.popup__description');
  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else { popupDescription.remove() }

  // Define features in template
  const popupFeatures = cardOfAdvertisement.querySelector('.popup__features');
  popupFeatures.innerHTML = '';
  if (offer.features.length) {
    offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      popupFeatures.appendChild(featureElement);
    });
  } else { popupFeatures.remove() }

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
  } else { photosBox.remove() }

  // Define avatar
  cardOfAdvertisement.querySelector('.popup__avatar').src = author.avatar;

  return cardOfAdvertisement
};

export { getNewTemplateCard };
