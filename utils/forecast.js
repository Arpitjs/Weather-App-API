let request = require('request')

let forecast = (language, latitude, longitude, cb) => {
    let url = `https://api.darksky.net/forecast/197c56156adfa1558e99a733ee124388/${latitude},${longitude}?${language}&units=si`
    request({ url: url, json: true }, (err, response) => {
        if(err) {
            cb('cannot connect to the darksky API.')
        } else {
            cb(null, {
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                rain: response.body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast

