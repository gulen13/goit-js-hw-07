import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createGallery(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);

galleryContainer.addEventListener('click', onGalleryClick);

function createGallery(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `<div class="gallery__item">
           <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
  }).join('');
}

function onGalleryClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return
  }
  const largeUrl = event.target.dataset.source;

  const modal = basicLightbox.create(`<img src="${largeUrl}">`, {
    onShow: () => {
      document.addEventListener("keydown", closeOnEscape);
    },
    onClose: () => {
      document.removeEventListener("keydown", closeOnEscape);
    }
  });

  modal.show()

  function closeOnEscape(event) {
    if (event.code !== "Escape") {
      return
    }
    modal.close();
  }
}