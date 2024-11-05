import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const API_KEY = "46878404-43e11e495eedf0f56c253a7d9";
const API_URL = "https://pixabay.com/api/";

export function fetchData(inputValue) {

    const randomPage = Math.floor(Math.random() * 10) + 1;

    const options = new URLSearchParams({
        key: API_KEY,
        q: inputValue,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: randomPage,
        per_page: 15
    });

    const urlWithParams = `${API_URL}?${options.toString()}`;

    return fetch(urlWithParams)
        .then(res => {
            if (!res.ok) {
                throw new Error("...UPS");
            }
            return res.json();
        })
        .then(data => {
            console.log(data);

            if (data.hits.length === 0) {
                iziToast.error({
                    title: 'Помилка',
                    message: "Вибачте, не знайдено зображень за вашим запитом. Спробуйте ще раз!",
                    position: 'topCenter',
                    backgroundColor: '#ef4040',
                });
                return [];
            }
            return data.hits;
        })
        .catch(err => {
            console.log(err);

            iziToast.error({
                title: 'Помилка',
                message: 'Сталася помилка при отриманні даних. Спробуйте ще раз.',
                position: 'topCenter',
                backgroundColor: '#ef4040',
            });
        });
}
