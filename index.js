import{i as a,S as p}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const m="46878404-43e11e495eedf0f56c253a7d9",h="https://pixabay.com/api/";function g(r){if(!r||r.trim()==="")return a.error({title:"Ошибка",message:"Введите запрос.",position:"topCenter",backgroundColor:"#ef4040"}),Promise.resolve([]);const o=Math.floor(Math.random()*10)+1,n=new URLSearchParams({key:m,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}),i=`${h}?${n.toString()}`;return fetch(i).then(e=>{if(!e.ok)throw new Error("Ошибка при получении данных от API");return e.json()}).then(e=>!e.hits||e.hits.length===0?(a.error({title:"Ошибка",message:"Извините, изображения не найдены по вашему запросу. Попробуйте снова!",position:"topCenter",backgroundColor:"#ef4040"}),[]):e.hits).catch(e=>(console.error("Ошибка при получении данных:",e),a.error({title:"Ошибка",message:"Произошла ошибка при получении данных. Проверьте подключение к интернету и попробуйте снова.",position:"topCenter",backgroundColor:"#ef4040"}),[]))}const u=document.querySelector(".list");function y(r){if(u.innerHTML="",!r||r.length===0){u.innerHTML="<p>No images found.</p>";return}const o=r.map(({webformatURL:n,largeImageURL:i,tags:e,likes:t,views:s,comments:c,downloads:f})=>`
        <div class="gallery-item">
            <a href="${i}" class="gallery-link"> <!-- убрали target="_blank" -->
                <img src="${n}" alt="${e||"Image"}" width="360" height="200" loading="lazy"/>
            </a>
            <div class="info">
                <p class="info-text"><b class="xz">Likes:</b> ${t}</p>
                <p class="info-text"><b class="xz">Views:</b> ${s}</p>
                <p class="info-text"><b class="xz">Comments:</b> ${c}</p>
                <p class="info-text"><b class="xz">Downloads:</b> ${f}</p>
            </div>
        </div>
    `).join("");u.insertAdjacentHTML("beforeend",o)}document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector(".search-form"),o=document.querySelector(".search-form input"),n=document.querySelector(".loader"),i=document.querySelector(".gallery");let e;if(!r||!o||!n||!i)return;r.addEventListener("submit",t);function t(f){f.preventDefault();const d=o.value.trim();if(d===""){a.info({title:"Error",message:"Fill in the request field"});return}s(),g(d).then(l=>{Array.isArray(l)&&l.length>0?(y(l),e?e.refresh():e=new p(".gallery-item a",{captionsData:"alt",captionDelay:250})):a.warning({title:"No Results",message:"No images found. Try a different search."})}).catch(l=>{console.error("Error loading data:",l),a.error({position:"topRight",title:"Error",message:"An error occurred while retrieving images. Try again!",backgroundColor:"#ef4040"})}).finally(()=>{c(),r.reset()})}function s(){n.style.display="block"}function c(){n.style.display="none"}});
//# sourceMappingURL=index.js.map
