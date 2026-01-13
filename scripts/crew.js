import {loadApiData} from './api.js';

// crew
const crewNav = document.getElementById('crew_slider_nav');
const crewImgs = document.getElementById('crew_img_holder');

//generate navigation and get indexes
async function crewSlider() {
    const data = await loadApiData();

    data.crew.forEach((item, index) => {
        const li = document.createElement('li');

        li.classList.add('slider_nav_item');
        li.dataset.index = index;

        crewNav.appendChild(li);
        
        if(index === 0) {
            li.classList.add('active');
        }

        li.addEventListener('click', () => {
            document.querySelectorAll('#crew_slider_nav li').forEach( item => {
                item.classList.remove('active');
            });
            li.classList.add('active');
            
            showCrewMember(index)
        });
    });

    showCrewMember(0);
}

function getCrewImg(images) {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 480) {
        return images.webp;
    } else {
        return images.png;
    }
}

async function showCrewMember(index) {
    const data = await loadApiData();
    const currentCrew = data.crew[index];

    const crewRole = document.getElementById('crew_role')
    const crewTitle = document.getElementById('crew_title')
    const crewText = document.getElementById('crew_text')

    // get images
    const imgSrc = getCrewImg(currentCrew.images);
    crewImgs.innerHTML = `<img src="${imgSrc}" alt="">`;

    // animate
    const img = crewImgs.querySelector('img');
    requestAnimationFrame(() => {
        img.classList.add('animated');
    });

    // get text
    crewRole.innerText = `${currentCrew.role}`;
    crewTitle.innerText = `${currentCrew.name}`;
    crewText.innerText = `${currentCrew.bio}`;

}

crewSlider();