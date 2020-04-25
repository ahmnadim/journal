const passport = require('passport');
const User = require('../config/db').User;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {validationResult} = require('express-validator');
const nodemailer = require('nodemailer');

const home = (req, res) => {
	res.render('index');
}

const registerForm = (req, res) => {
	if (req.session.user) {
		res.redirect('/admin/dashboard');
	}
	
	res.render('registration', {
		email: '',
		name: ''
	});
}

const register = (req, res) => {
	let { name, email, password } = req.body;
	
	var hashedToken = crypto.randomBytes(50).toString('hex');

	let activationUrl = 'http://'+req.get('host')+'/verify/'+hashedToken;
	
	let hashedPassword = bcrypt.hashSync(password, 10, (err, hash) => {
			if (err) throw err;
			return hash;
		});
	
	let expire = Date.now() + 24 * 3600 * 1000;

		User.create({name, email, password: hashedPassword, isActive: false, hashedToken, expire})
		.then(async user => {
			req.flash('success_msg', 'Registered Successfull, please confirm your email and then login.');		

			let transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
   				 port: 465,
    			secure: true, // use SSL
				auth: {
				  user: "nadimahmadulhoq@gmail.com", // generated ethereal user
				  pass: "*#nadimahmadulhoq*#" // generated ethereal password
				}
			  });

			// send mail with defined transport object
			let info = await transporter.sendMail({
				from: '"Blog" nadimahmadulhoq@gmail.com', // sender address
				to: email, // list of receivers
				subject: "Activate your acount.", // Subject line
				html: `Hello ${name} To activate your acount please click the following link.
				<b>Activation Link: </b> <a href="${activationUrl}" >Click here....</a>` // html body
			});

			res.redirect('/login');
		});
}

const loginForm = (req, res) => {
	if (req.session.user) {
		console.log(req.flash('error'));
		res.redirect('/admin/dashboard');
	}
	
	res.render('login', {
		email: ''
	});
}

const login = (req, res, next) => {
	const {email, password} = req.body;
	
	User.findOne({where: {email: email}})
		.then(user => {
			
			if (user) {
				
				const isMatched = bcrypt.compareSync(password, user.password);
				if (!isMatched) {
					
					return res.render('login', {
						errors: [{'msg': 'Invalid passoword!'}],
						email: email
					});
					
				}
				if(user.isActive != true){
					req.flash('error_msg', 'Please verify your account to login.');
					return res.redirect('/login');
				}else{
					req.session.user = user;
					req.user = user;

					return res.redirect('/admin/dashboard');
				}
			}else{
				return res.render('login', {
					errors: [{'msg': 'E-mail not registerd yet!'}],
					email: email
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
}

const verify = (req, res) => {
	const token = req.params.token;

	User.findOne({where: {hashedToken: token}})
	.then(user => {
		if(!user){
			req.flash('error', 'Invalid Token, Please try to register.');
			return res.redirect('/register');
		}

		user.isActive = true;
		user.save();
		req.flash('success_msg', 'Successfully verifyed, Please login to confinue.');
		res.redirect('/login');
		
	})
	.catch();
}

const logout = (req, res) => {
	req.session.destroy();
	return res.redirect('/login');
}


module.exports = {home, registerForm, register, loginForm, login, verify, logout}