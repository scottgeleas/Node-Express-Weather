const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	msg1.textContent = 'Loading...';
	msg2.textContent = '';

	const location = search.value;

	fetch('http://localhost:3000/weather?address=' + location).then((res) => {
		res.json().then((data) => {
			if (data.error) {
				msg1.textContent = data.error;
			} else {
				msg1.textContent = data.location;
				msg2.textContent = data.forecast;
			}
		});
	});
});
