import axios from 'axios';
export let perPage = 15;
import { page } from '../main';

export async function getPictures(query, currentPage){
    const BASE_URL = 'https://pixabay.com/api/'
    const params = new URLSearchParams({
        key: '46813700-d54068e337851aebc3c875554',
        q: query,
        image_type: 'photo', 
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: perPage
    })
    const url = `${BASE_URL}?${params}`;

    const images = await axios.get(url)
    .then(response => response.data.hits)
    .catch(error => console.log(error))

    return images;
}