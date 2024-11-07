import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector(".search-form");
const loader = document.querySelector(".loader");
const gallery = document.querySelector(".gallery");
const loadBtn = document.querySelector(".btn-load");

let query = '';
let page = 1;
let per_page = 15;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
     query = event.currentTarget.elements.searchQuery.value.trim();

    if(!query) {
        iziToast.error({ 
            title: 'Error', message: 'Будь ласка, введіть пошуковий запит' });
            return;
    }
     page = 1;
     gallery.innerHTML = '';
     loadBtn.style.display = 'none';
     fetchRenderImages();
});
const fetchRenderImages = async () => {
    try {
        loader.style.display ='block';
        const data = await fetchImages(query, page, per_page);
        loader.style.display = 'none';

        if(data.hits.length === 0) {
            iziToast.info({
                message: 'На жаль, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка, спробуйте ще раз!'
            });
            loadBtn.style.display = 'none';
            return;
        }
        renderImages(data.hits);
        page += 1;

        if(data.hits.length < per_page || page > Math.ceil(data.totalHits / per_page)) {
            loadBtn.style.display = 'none';
            iziToast.info({ message: 'Вибачте, але ви досягли кінця результатів пошуку'})
        } else {
            loadBtn.style.display = 'block';
        }
    } catch (error) {
        loadBtn.style.display = 'none';
        iziToast.error({title: 'Error', message: error.message});
    }
};

loadBtn.addEventListener('click', async () => {
    await fetchRenderImages();
    const galleryRect = document.querySelector('.gallery').lastElementChild.getBoundingClientRect();
    window.scrollBy({
        top: galleryRect.height * 2,
        behavior: 'smooth'
    });
});