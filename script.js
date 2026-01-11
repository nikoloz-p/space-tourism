// side nav menu
const burgerMenu = document.getElementById('burger_menu');
const headerNav = document.getElementById('header_nav_items');
const closeNavBtn = document.getElementById('close_nav');

burgerMenu.addEventListener('click', () => {
    headerNav.classList.add('active');
});

closeNavBtn.addEventListener('click', () => {
    headerNav.classList.remove('active');
});

// load API data
let data = null;

async function loadApiData() {
    if (data) return data;

    const result = await fetch('https://raw.githubusercontent.com/bekkalomsadze/API-space-tourism/refs/heads/main/data.json');
    data = await result.json();
    
    return data;
}

// destinations
const destinationsNav = document.getElementById('destinations_nav');

async function destinations() {
    const data = await loadApiData();

    // generate nav
    data.destinations.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;

        li.dataset.index = index;

        destinationsNav.appendChild(li);        

        if (index === 0) {
            li.classList.add('active');
        }

        li.addEventListener('click', () => {
            showDestination(index);
            
            document.querySelectorAll('#destinations_nav li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
        });

    });
    
    showDestination(0);
}

async function showDestination(index){
    const data = await loadApiData();
    const dest = data.destinations[index];

    // generate imgs
    const content_img_holder = document.getElementById('content_img_holder');

    content_img_holder.innerHTML = `<img src="${dest.images.png}">`
    const img = content_img_holder.querySelector('img');

    requestAnimationFrame(() => {
        img.classList.add('show');
    });

    //generate text
    const destinationsTitle = document.getElementById('destinations_title');
    const destinationsText = document.getElementById('destinatons_text');
    const destinationsDistance = document.getElementById('destinations_distance');
    const destinationsTravelTime = document.getElementById('destinations_travel_time');

    destinationsTitle.innerText = `${dest.name}`
    destinationsText.innerText = `${dest.description}`
    destinationsDistance.innerText = `${dest.distance}`;
    destinationsTravelTime.innerText = `${dest.travel}`;
};


destinations();