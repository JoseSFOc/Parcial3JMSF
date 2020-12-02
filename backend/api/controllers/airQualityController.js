const airQualityService = require("../services/airQualityService");

exports.findAll = async (req, res, next) => {
    try {
        const url = "https://datosabiertos.malaga.eu/recursos/ambiente/calidadaire/calidadaire.json";

        if (req.query.latitude && req.query.longitude && req.query.radius) {
            res.status(200).json(await airQualityService.findByCoordinates(
                url,
                req.query.latitude,
                req.query.longitude,
                req.query.radius)
            );
        } else {
            res.status(200).json(await airQualityService.findAll(url));
        }
    } catch (e) {
        next(e);
    }
};
