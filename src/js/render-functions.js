const list = document.querySelector(".list");  

export function formResults(images) {  
    // Проверка на наличие изображений  
    if (!images || images.length === 0) {  
        list.innerHTML = "<p>No images found.</p>"; // Сообщение об отсутствии изображений  
        return;  
    }  

    // Генерация HTML разметки для каждого изображения  
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `  
        <div class="gallery-item">  
            <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer">  
                <img src="${webformatURL}" alt="${tags || 'Image'}" width="360" height="200" loading="lazy"/>  
            </a>  
            <div class="info">  
                <p class="info-text"><b class="xz">Likes:</b> ${likes}</p>  
                <p class="info-text"><b class="xz">Views:</b> ${views}</p>  
                <p class="info-text"><b class="xz">Comments:</b> ${comments}</p>  
                <p class="info-text"><b class="xz">Downloads:</b> ${downloads}</p>  
            </div>  
        </div>  
    `).join("");  

    // Обновление содержимого списка изображений  
    list.innerHTML = ""; // Очищаем предыдущие результаты  
    list.insertAdjacentHTML("beforeend", markup); // Вставляем новые изображения  
}