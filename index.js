import{i as s,S as m}from"./assets/vendor-5ObWk2rO.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const h="46878404-43e11e495eedf0f56c253a7d9",g="https://pixabay.com/api/";function y(o){if(!o||o.trim()==="")return s.error({title:"Ошибка",message:"Введите запрос.",position:"topCenter",backgroundColor:"#ef4040"}),Promise.resolve([]);const n=Math.floor(Math.random()*10)+1,r=new URLSearchParams({key:h,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:n,per_page:15}),i=`${g}?${r.toString()}`;return fetch(i).then(e=>{if(!e.ok)throw new Error("Ошибка при получении данных от API");return e.json()}).then(e=>e.hits.length===0?(s.error({title:"Ошибка",message:"Извините, изображения не найдены по вашему запросу. Попробуйте снова!",position:"topCenter",backgroundColor:"#ef4040"}),[]):e.hits).catch(e=>(console.error(e),s.error({title:"Ошибка",message:"Произошла ошибка при получении данных. Попробуйте снова.",position:"topCenter",backgroundColor:"#ef4040"}),[]))}const l=document.querySelector(".list");function b(o){if(!o||o.length===0){l.innerHTML="<p>No images found.</p>";return}const n=o.map(({webformatURL:r,largeImageURL:i,tags:e,likes:t,views:a,comments:d,downloads:p})=>`  
        <div class="gallery-item">  
            <a href="${i}" target="_blank" rel="noopener noreferrer">  
                <img src="${r}" alt="${e||"Image"}" width="360" height="200" loading="lazy"/>  
            </a>  
            <div class="info">  
                <p class="info-text"><b class="xz">Likes:</b> ${t}</p>  
                <p class="info-text"><b class="xz">Views:</b> ${a}</p>  
                <p class="info-text"><b class="xz">Comments:</b> ${d}</p>  
                <p class="info-text"><b class="xz">Downloads:</b> ${p}</p>  
            </div>  
        </div>  
    `).join("");l.innerHTML="",l.insertAdjacentHTML("beforeend",n)}const f=document.querySelector(".search-form"),L=document.querySelector(".search-form input"),u=document.querySelector(".loader");document.querySelector(".gallery");let c;f.addEventListener("submit",x);function x(o){o.preventDefault();const n=L.value.trim();if(n==="")return s.info({title:"Error",message:"Fill in the request field"});v(),y(n).then(r=>{r&&r.length>0?(b(r),c?c.refresh():c=new m(".gallery-item a",{captionsData:"alt",captionDelay:250})):s.warning({title:"No Results",message:"No images found. Try a different search."})}).catch(r=>{console.log(r),s.error({position:"topRight",title:"Error",message:"An error occurred while retrieving images. Try again!",backgroundColor:"#ef4040"})}).finally(()=>{w(),f.reset()})}function v(){u.style.display="block"}function w(){u.style.display="none"}
//# sourceMappingURL=index.js.map