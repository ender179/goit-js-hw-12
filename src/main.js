import iziToast from 'izitoast';  
import { getGalleryData } from './js/pixabay-api';  
import { fetchGallery } from './js/render-functions';  

let queryString = '';  
let currentPage = 1;  
let evtType = '';  

const IMAGE_MAX_COUNT = 15;  

const form = document.querySelector('.search-form');  
const gallery = document.querySelector('.gallery');  
const loadMoreBtn = document.querySelector('.load-more-btn');  

// Додати обробник події для форми  
form.addEventListener('submit', onSubmitForm);  

// Додати обробник події для кнопки "Load More"  
loadMoreBtn.addEventListener('click', async () => {  
  try {  
    evtType = 'click';  
    await renderGallery(queryString, currentPage);  

    const liEl = document.querySelector('li');  
    if (liEl) {  
      const { height } = liEl.getBoundingClientRect();  
      scrollVertical(height * 2, 0);  
    }  
  } catch (error) {  
    showInfoMessage('Виникла помилка: ' + error, 'orange');  
  }  
});  

async function onSubmitForm(event) {  
  try {  
    event.preventDefault();  

    const target = event.target;  
    const search = target.elements.search.value.trim();  

    evtType = 'submit';  

    loadMoreBtn.classList.remove('visible');  

    iziToast.destroy();  

    // Перевірка на новий запит  
    if (queryString !== search || evtType === 'submit') {  
      gallery.innerHTML = '';  
      queryString = search;  
      currentPage = 1;  
    }  

    // Якщо поле пошуку пусте  
    if (!search) {  
      showInfoMessage('Будь ласка, введіть пошуковий запит.', 'blue');  
      gallery.innerHTML = '';  
      return;  
    }  

    await renderGallery(queryString, currentPage);  
    target.reset();  
  } catch (error) {  
    showInfoMessage('Виникла помилка: ' + error, 'orange');  
  }  
}  

async function renderGallery(searchValue, page) {  
  try {  
    // Збільшення сторінки для "Load More"  
    if (searchValue === queryString && evtType === 'click') {  
      currentPage += 1;  
      page += 1;  
    }  

    const galleryData = await getGalleryData(searchValue, page);  

    removeLoader();  

    // Перевірка даних галереї  
    if (validateGalleryData(galleryData)) {  
      const restOfImages = Math.round(galleryData.totalHits / page);  
      fetchGallery(galleryData);  
      showHideBtn(restOfImages);  
    }  
  } catch (error) {  
    showInfoMessage('Виникла помилка: ' + error, 'orange');  
  }  
}  

function scrollVertical(x = 0, y = 0) {  
  window.scrollBy({ top: x, left: y, behavior: 'smooth' });  
}  

function removeLoader() {  
  const loaderWrapper = document.querySelector('.loader-wrapper');  
  if (loaderWrapper) {  
    loaderWrapper.remove();  
  }  
}  

function validateGalleryData(galleryData) {  
  if (!galleryData) {  
    gallery.innerHTML = '';  
    return false;  
  } else if (galleryData && galleryData.totalHits === 0) {  
    showInfoMessage('Нічого не знайдено.', 'red');  
    gallery.innerHTML = '';  
    return false;  
  }  
  return true;  
}  

function showHideBtn(imagesCount) {  
  if (imagesCount <= IMAGE_MAX_COUNT) {  
    loadMoreBtn.classList.remove('visible');  
    showInfoMessage('Це кінець пошуку.', 'blue');  
  } else {  
    loadMoreBtn.classList.add('visible');  
  }  
}  

// Функція для показу повідомлень  
function showInfoMessage(message, bgColor) {  
  iziToast.show({  
    message: message,  
    backgroundColor: bgColor,  
  });  
}