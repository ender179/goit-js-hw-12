export function renderElement({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
    return `<li class="gallery-item">
        <a class="gallery-link" href= ${largeImageURL}>  
            <img class="gallery-image"
                src= "${webformatURL}"
                alt = "${tags}"
            />
        </a>
        <div class="container"><h3 class="header">Likes
            <p class="views">${likes}</p>
        </h3>
        <h3 class="header">Views
        <p class="views">${views}</p>
        </h3>
        <h3 class="header">Comments
        <p class="views">${comments}</p>
        </h3>
        <h3 class="header">Downloads
        <p class="views">${downloads}</p>
        </h3>
        </div>
        
    </li>`
    }
    
    export function renderElements(arr) {
    return arr.map(renderElement).join('');
    }