let request = require('request')
let geoCodes = (place, cb) => {
    let geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiYXJwaXRqcyIsImEiOiJjazE1dWsxbzQweXc0M2xxZGtreHloZmZpIn0.ZsPq84XxmY1s6vOC_D-yxw&limit=1`
    request({ url: geoCodeUrl, json: true }, (error, response) => {
        if (error) {
            cb('cannot connect to the mapbox API.')
        } else if (response.body.features.length === 0) {
            cb('no such place exists.')
        }
        else {
            cb(null, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    })
}
module.exports = geoCodes