const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;

// Paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Static Directory
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Scott Geleas',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Scott Geleas',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Scott Geleas',
		msg: 'I like pie',
	});
});

app.get('/weather', (req, res) => {
	const address = req.query.address;
	if (!address) {
		return res.send({
			error: 'Please provide a location.',
		});
	} else {
		geocode(address, (err, { lat, lon, location } = {}) => {
			if (err) {
				return res.send({ error: err });
			}

			forecast(lat, lon, (err, forecastData) => {
				if (err) {
					return res.send({ error: err });
				}
				return res.send({
					forecast: forecastData,
					location,
					address: address,
				});
			});
		});
	}
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term.',
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404 Help',
		name: 'Scott Geleas',
		message404: 'Help article not found.',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Scott Geleas',
		message404: 'Page not found.',
	});
});

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
