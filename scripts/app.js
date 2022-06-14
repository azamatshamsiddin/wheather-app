const api = {
  key: "e8084d15043db67b97b1f47d310789ad",
  url: "https://api.openweathermap.org/data/2.5/",
};
let searchBoxInput = document.querySelector(".search-box__input");

searchBoxInput.addEventListener("keypress", setQuery);
function setQuery(e) {
  if (e.keyCode === 13) {
    console.log(searchBoxInput.value);
    getResult(searchBoxInput.value);
  }
}

function getResult(query) {
  fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);

  let wrapper = document.querySelector(".wrapper"),
    wrapperLocation = document.querySelector(".wrapper__location"),
    temp = document.querySelector(".wrapper__temp"),
    icon = document.querySelector(".wrapper__icon-img"),
    tempStatus = document.querySelector(".wrapper__temp-status"),
    tempInterval = document.querySelector(".wrapper__temp-interval");
  wrapperLocation.textContent = `${weather.name}, ${weather.sys.country}`;
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  tempStatus.innerHTML = `${weather.weather[0].main}`;
  tempInterval.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}<span>°C</span> / ${Math.ceil(weather.main.temp_max)}<span>°C</span>`;
  console.log(weather.weather.icon);
}

let date = document.querySelector(".wrapper__date"),
  now = new Date();
date.innerHTML = dateBuilder(now);

function dateBuilder(i) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[i.getDay()];
  let date = i.getDate();
  let month = months[i.getMonth()];
  let year = i.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
