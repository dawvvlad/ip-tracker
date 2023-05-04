import "leaflet/dist/leaflet.css"
import L from "leaflet";


const API_KEY = `at_RNhzBZtAzAbEI21eQuEH5aclmjxh4`;
const input = document.querySelector(`.search-bar__input`);
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }
    ).addTo(map);

const btn = document.querySelector(`.search-bar__btn`);
btn.onclick = function() {
    printLocation(input.value)
}

async function getIP(ipAddress) {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${API_KEY}&ipAddress=${ipAddress}`);
    return response.json()
}

function printLocation(ipAddress) {
    Promise.resolve(getIP(ipAddress)).then(result => {
        const { location } = result;
        const allEls = document.body.getElementsByTagName(`*`);

        console.log(result);

        [...allEls].forEach(el => {
            for(let key in result) {
                if(el.matches(`#${key}`)) el.innerHTML = result[key];
            };
            for(let key in location) {
                if(el.matches(`#${key}`)) el.innerHTML += location[key];
            }
        });

        getMap(location)
    });

};

function getMap( { lat, lng, city } ) {
    map.setView([lat, lng], 13);
    L.marker([lat, lng], {alt: `${city}`}).addTo(map)
}

