const url = `https://api.openweathermap.org/data/2.5/`;
const key = "d65de1089c201678662a4c14587b4ecb";

const setQuery = (e) => {
  if (e.keyCode == "13") {
    getResult(searchBar.value);
  }
};

const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=eng`;
  //   console.log(query);
  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(showResult);
};

const showResult = (result) => {
  //   console.log(result);
  let city = document.querySelector(".city");
  city.innerHTML = `${result.name} , ${result.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(result.main.temp)}°C`;

  let desc = document.querySelector(".desc");
  desc.innerHTML = result.weather[0].description;

  //weather icons
  // icon.img.remove();
  // const icons = document.querySelector(".icon");
  let img = document.createElement("img");
  img.style.width = "20%";
  img.style.height = "20%";
  let icon = document.getElementById("icon");
  icon.appendChild(img);

  if (desc.textContent == "clear sky" || desc.textContent == "sunny") {
    img.src = "sunny.png";
  } else if (
    desc.textContent == "cloudy" ||
    desc.textContent == "broken clouds" ||
    desc.textContent == "overcast clouds" ||
    desc.textContent == "scattered clouds" ||
    desc.textContent == "few cloudy"
  ) {
    img.src = "cloudy.jpg";
  } else if (
    desc.textContent == "rainy" ||
    desc.textContent == "drizzle" ||
    desc.textContent == "light rain"
  ) {
    img.src = "rainy.jpg";
  } else if (desc.textContent == "snowy" || desc.textContent == "foggy") {
    img.src = "snowy.png";
  }

  let minmax = document.querySelector(".minmax");
  minmax.innerHTML = `${Math.round(result.main.temp_min)}°C/
${Math.round(result.main.temp_max)}°C`;
};

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);
