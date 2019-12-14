const express = require('express');
const cors = require('cors');
const path = require('path');
const nodeMailer = require('nodemailer');
const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use(cors());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));

	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	})
}

app.listen(port, err => {
	if (err) throw err;
	console.log(`Server running on port ${port}`)
});

app.post('/send', (req, res) => {
	let name = req.body.name;
	let email = req.body.email;
	let subject = `Message from ${name}, through CodeSurge`;
	let message = req.body.message;
	let content = `name: ${name} \n email: ${email} \n message: ${message} `;

	let transporter = nodeMailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.USER,
			pass: process.env.PASS
		}
	});

	let mail = {
		from: name,
		to: 'eazylaykzy@gmail.com',
		subject: subject,
		text: content
	};

	transporter.sendMail(mail, (err, data) => {
		if (err) {
			console.log(err);
			res.json({
				msg: 'fail',
				err
			})
		} else {
			res.json({
				msg: 'success'
			})
		}
	});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
