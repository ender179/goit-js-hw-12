import { fetchData } from "./js/pixabay-api";
import { formResults } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector(".search-form");
    const inputText = document.querySelector(".search-form input");
    const loader = document.querySelector(".loader");
    const gallery = document.querySelector(".gallery"); // галерея для изображений
    let lightbox; // переменная для хранения экземпляра SimpleLightbox

    if (!searchForm || !inputText || !loader || !gallery) {
        console.error("Не удалось найти один или несколько элементов в DOM.");
        return;
    }

    searchForm.addEventListener("submit", handleForm);

    function handleForm(event) {
        event.preventDefault();
        const inputValue = inputText.value.trim(); // получаем значение из поля ввода

        if (inputValue === "") { // проверяем, что поле не пустое
            iziToast.info({
                title: 'Error',
                message: 'Fill in the request field',
            });
            return;
        }

        showLoader(); // показываем загрузчик

        fetchData(inputValue) // вызываем функцию для получения данных
            .then(res => {
                if (Array.isArray(res) && res.length > 0) { // проверка, что res - массив с данными
                    formResults(res); // отображаем результаты
                    if (lightbox) {
                        lightbox.refresh(); // обновляем lightbox, если он уже существует
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
                console.error("Ошибка при загрузке данных:", error);
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
});
