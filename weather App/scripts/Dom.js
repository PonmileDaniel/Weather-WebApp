const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUi = data => {
  console.log(data);
  //   const cityDetails = data.cityDetails;
  //   const weather = data.weather;

  //destructure properties
  const { cityDetails, weather } = data;

  //update details Template
  details.innerHTML = `
<h5 class="my-3">${cityDetails.EnglishName}</h5>
<div class="my-3">${weather.WeatherText}</div>
<div class="display-4 my-4">
  <span><i> ${weather.Temperature.Metric.Value}</i></span>
  <span>&deg;C</span>
</div>`;

  //update thr night and Day & icon image

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timesrc = null;
  if (weather.IsDayTime) {
    timesrc = "img/day.svg";
  } else {
    timesrc = "img/night.svg";
  }

  time.setAttribute("src", timesrc);

  //remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};


cityForm.addEventListener("submit", e => {
  //prevent default action
  e.preventDefault();
  //get city Value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the Ui with new city
  forecast.updateCity(city)
    .then(data => {
      updateUi(data);
    })
    .catch(err => console.log(err));
});
