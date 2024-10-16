const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '60ae41103acc4e14812195349241610';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`)
        .then(response => response.json())
        .then(json => {
            if (json.error && json.error.code === 1006) {
                container.style.height = '500px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.current.condition.text.toLowerCase()) {
                case 'sunny':
                case 'clear':
                    image.src = 'images/clear.png';
                    break;
                case 'rain':
                case 'light rain':
                case 'moderate rain':
                    image.src = 'images/rain.png';
                    break;
                case 'snow':
                case 'light snow':
                case 'moderate snow':
                    image.src = 'images/snow.png';
                    break;
                case 'cloudy':
                case 'partly cloudy':
                case 'overcast':
                    image.src = 'images/cloud.png';
                    break;
                case 'mist':
                case 'fog':
                case 'haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${json.current.temp_f.toFixed(1)}<span>°F</span>`;
            description.innerHTML = json.current.condition.text;
            humidity.innerHTML = `${json.current.humidity}%`;
            wind.innerHTML = `${json.current.wind_mph.toFixed(1)} M/hr`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '595px';
        });
});