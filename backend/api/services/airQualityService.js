const airQualityFacade = require("../dao/airQualityFacade");

exports.findAll = async (url) => {
    return await airQualityFacade.findAll(url);
}

exports.findByCoordinates = async (url, lat, long, r) => {
    return await airQualityFacade.findByCoordinates(url, lat, long, r);
};

