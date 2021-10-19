const request = require('postman-request');

const forecast = (lat, lon, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=090374cb188e19b7c9adee7f61a17cfc&query=' +
		lat +
		',' +
		lon +
		'&units=f';

	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connect to weather service.', undefined);
		} else if (body.error) {
			callback('Unable to find location.', undefined);
		} else {
			callback(
				undefined,
				body.current.weather_descriptions[0] +
					'. It is currently ' +
					body.current.temperature +
					' out. It feels like ' +
					body.current.feelslike +
					' out.'
			);
		}
	});
};

module.exports = forecast;
