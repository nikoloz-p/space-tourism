import {loadApiData} from '../scripts/api.js';

// elememts
const techImgHolder = document.getElementById('technology_img_holder');
const techSliderNav = document.getElementById('technology_slider_nav');
const techTitle = document.getElementById('technology_title');
const techText = document.getElementById('technology_text');


async function getTechItems() {
    const data = await loadApiData();

    data.technology.forEach((item, index) => {

        const li = document.createElement('li');
        li.innerHTML = `${index+1}`

        li.dataset.index = index

        techSliderNav.appendChild(li);

        if(index === 0) {
            li.classList.add('active');
        }
        
        li.addEventListener('click', () => {
            document.querySelectorAll('#technology_slider_nav li').forEach(item => {
                item.classList.remove('active')
            });
            li.classList.add('active');
            
            genImgs(index);
        });

    });
    genImgs(0)
}

function getImgPath(name) {
    const ww = window.innerWidth;

    if(ww <= 768) {
        return `./assets/technology/${name}_mobile.jpg`;
    }else if(ww <= 1440) {
        return `./assets/technology/${name}_tablet.jpg`;
    }else {
        return `./assets/technology/${name}_desktop.jpg`;
    }
}


async function genImgs(index) {
    const data = await loadApiData();
    const currentTech = data.technology[index];

    const cleanName = currentTech.name.toLowerCase().replace(/\s+/g, "_");

    console.log(currentTech)

    techImgHolder.innerHTML = `<img src="${getImgPath(cleanName)}">`;

    techTitle.innerText = `${currentTech.name}`;
    techText.innerText = `${currentTech.description}`

};


getTechItems();