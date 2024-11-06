import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const API_KEY = "46878404-43e11e495eedf0f56c253a7d9";
const API_URL = "https://pixabay.com/api/";

export function fetchData(inputValue) {
    // Проверка на пустое значение
    if (!inputValue || inputValue.trim() === "") {
        iziToast.error({
            title: 'Ошибка',
            message: "Введите запрос.",
            position: 'topCenter',
            backgroundColor: '#ef4040',
        });
        return Promise.resolve([]); // Возвращаем пустой массив при отсутствии запроса
    }

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
                throw new Error("Ошибка при получении данных от API");
            }
            return res.json();
        })
        .then(data => {
            if (!data.hits || data.hits.length === 0) { // Проверка, что hits существует и содержит элементы
                iziToast.error({
                    title: 'Ошибка',
                    message: "Извините, изображения не найдены по вашему запросу. Попробуйте снова!",
                    position: 'topCenter',
                    backgroundColor: '#ef4040',
                });
                return []; // Возвращаем пустой массив, если нет результатов
            }
            return data.hits; // Возвращаем найденные изображения
        })
        .catch(err => {
            console.error("Ошибка при получении данных:", err); // Логируем ошибку с уточнением
            iziToast.error({
                title: 'Ошибка',
                message: 'Произошла ошибка при получении данных. Проверьте подключение к интернету и попробуйте снова.',
                position: 'topCenter',
                backgroundColor: '#ef4040',
            });
            return []; // Возвращаем пустой массив в случае ошибки
        });
}
