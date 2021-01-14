const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

exports.findByCoordinates = async (lat, lon) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY_OPENWEATHER}&units=metric`;
  const products = await fetch(url).then((resp) => resp.json());
  return {
    ...products,
    icon: `http://openweathermap.org/img/wn/${products.weather[0].icon}@2x.png`,
  };
};
