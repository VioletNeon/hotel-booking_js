const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const photoBuildChooser = document.querySelector('.ad-form__upload input[type=file]');
const previewAvatarBox = document.querySelector('.ad-form__photo');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const onAdFormLoad = (loadField, previewField) => {
  const file = loadField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewField.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

avatarChooser.addEventListener('change', () => onAdFormLoad(avatarChooser, previewAvatar));
photoBuildChooser.addEventListener('change', () => {
  const previewPhotoBuild = previewAvatar.cloneNode(true);
  previewAvatarBox.appendChild(previewPhotoBuild);
  onAdFormLoad(photoBuildChooser, previewPhotoBuild);
});
