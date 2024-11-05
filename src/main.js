import { fetchData } from "./js/pixabay-api";
import { formResults } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector(".search-form");
const inputText = document.querySelector(".search-form input");
const loader = document.querySelector(".loader");
let lightbox;

searchForm.addEventListener("submit", handleForm);

function handleForm(event) {
    event.preventDefault();
   
    if (inputValue === "") {
        return iziToast.info({
            title: 'Error',
            message: 'Fill in the request field',
        });
    }

    showLoader();

    fetchData(inputValue)
        .then(res => {
            if (res && res.length > 0) {

                formResults(res);
                if (lightbox) {
                    lightbox.refresh();
                } else {
                    lightbox = new SimpleLightbox('.gallery-item a', {
                        captionsData: 'alt',
                        captionDelay: 250,
                    });
                }
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
            hideLoader();
            searchForm.reset();
        });
}

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}