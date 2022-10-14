class Forecast {
  constructor() {
    this.key = "	zogcIlQJX4GlZ0dY4XLV2jFBgpxTRzKV";
    this.weatherUrl =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityUrl =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);

    return {
      cityDetails,
      weather
    };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityUrl + query);
    const data = await response.json();

    return data[0];
  }
  async getWeather(id) {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${this.key}`;

    const response = await fetch(this.weatherUrl + query);
    const data = await response.json();
    return data[0];
  }
}
