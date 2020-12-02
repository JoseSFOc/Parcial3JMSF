const fetch = require("node-fetch");

exports.findAll = async(url) => {
    let res = [];

    return fetch(url)
        .then(resp => resp.json())
        .then((data) => {

            data.features.map(feature => {
                let coordinates = [];
                if (feature.geometry != null)
                    coordinates = feature.geometry.coordinates.shift().shift();

                const airZone = {
                    coordinates: [coordinates[1], coordinates[0]],
                    quality: feature.properties["iuca.level_F_global"] || "no info"
                };
                res.push(airZone);
            });
            return res;
        });
};

exports.findByCoordinates = async (url, lat, long, r) => {
    let res = [];

    return fetch(url)
        .then(resp => resp.json())
        .then((data) => {

            data.features.map(feature => {
                let coordinates = [];

                if (feature.geometry != null)
                    coordinates = feature.geometry.coordinates.shift().shift();

                if (r >= distBetween(lat, long, coordinates[1], coordinates[0])) {
                    const airZone = {
                        coordinates: [coordinates[1], coordinates[0]],
                        quality: feature.properties["iuca.level_F_global"] || "no info"
                    };
                    res.push(airZone);
                }
            });
            return res;
        });

};

// Result in meters
function distBetween(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d*1000;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}