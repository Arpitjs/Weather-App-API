let express = require('express')
let path = require('path')
let hbs = require('hbs')
let app = express()
let forecast = require('./utils/forecast')
let geocode = require('./utils/geocode')

//define paths for express config
let publicDirectoryPath = path.join(__dirname, 'public')
let viewsPath = path.join(__dirname, '/templates/views')
let partialsPath = path.join(__dirname, '/templates/partials')

//setup handlebars engine and views and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static takes the file to the path to the folder we wanna serve up
app.use(express.static(publicDirectoryPath))

//render used to render template engines
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'arpit js'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'arpit js'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        msg: 'i am not here to help you, fuck you. fuck yourself, dick.',
        title: 'help',
        name: 'arpit js'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errors: 'plz provide address man'
        })
    }
    geocode(req.query.address, (errors, {latitude,longitude, location} = {}) => {
        if (errors) {
            //j error cha tei pathaeko as object
            return res.send({errors: errors})
        }
        forecast('lang=en', latitude, longitude, (errors, {summary,temperature,rain} = {}) => {
            if (errors) {
                return res.send({errors: errors})
            }
            res.send({
                geocode: `the longitude and latititude of ${req.query.address} are ${latitude} and ${longitude}`,
                forecast: `${summary} The temperature is ${temperature} and there is ${rain} % chance of rain.`,
                location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'help article not found :/',
        name: 'arpit js'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'arpit js',
        errorMessage: 'page not found.'
    })
})

let port = 1010
app.listen(port, (err, done) => {
    if (err) {
        return console.log('err connecting to server')
    }
    console.log('server listening at port', port)
})
