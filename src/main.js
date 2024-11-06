import { fetchData } from "./js/pixabay-api";  
import { formResults } from "./js/render-functions";  

import iziToast from "izitoast";  
import "izitoast/dist/css/iziToast.min.css";  

import SimpleLightbox from "simplelightbox";  
import "simplelightbox/dist/simple-lightbox.min.css";  

const searchForm = document.querySelector(".search-form");  
const inputText = document.querySelector(".search-form input");  
const loader = document.querySelector(".loader");  
const gallery = document.querySelector('.gallery'); // галерея для изображений  
let lightbox; // переменная для хранения экземпляра SimpleLightbox  

searchForm.addEventListener("submit", handleForm);  

function handleForm(event) {  
    event.preventDefault();  
    const inputValue = inputText.value.trim(); // получаем значение из поля ввода  

    if (inputValue === "") { // проверяем, что поле не пустое  
        return iziToast.info({  
            title: 'Error',  
            message: 'Fill in the request field',  
        });  
    }  

    showLoader(); // показываем загрузчик  

    fetchData(inputValue) // вызываем функцию для получения данных  
        .then(res => {  
            if (res && res.length > 0) {  
                formResults(res); // отображаем результаты  
                if (lightbox) {  
                    lightbox.refresh(); // обновляем lightbox если уже существует  
                } else {  
                    // инициализируем lightbox при первом вызове  
                    lightbox = new SimpleLightbox('.gallery-item a', {  
                        captionsData: 'alt', // подписи для изображений из атрибута alt  
                        captionDelay: 250, // задержка перед показом подписи  
                    });  
                }  
            } else {  
                iziToast.warning({  
                    title: 'No Results',  
                    message: 'No images found. Try a different search.',  
                });  
            }  
        })  
        .catch(error => {  
            console.log(error);  
            iziToast.error({  
                position: 'topRight',  
                title: 'Error',  
                message: 'An error occurred while retrieving images. Try again!',  
                backgroundColor: '#ef4040',  
            });  
        })  
        .finally(() => {  
            hideLoader(); // скрываем загрузчик  
            searchForm.reset(); // сбрасываем форму  
        });  
}  

function showLoader() {  
    loader.style.display = "block"; // показываем загрузчик  
}  

function hideLoader() {  
    loader.style.display = "none"; // скрываем загрузчик  
}