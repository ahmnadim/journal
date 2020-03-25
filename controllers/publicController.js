const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

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
	let { name, email, password, confirm_password } = req.body;
	
	bcrypt.hash(password, 10, ((err, hash) => {
			if (err) throw err;
			password = hash;

			User.create({name, email, password})
			.then(user => {
				req.flash('success_msg', 'Registered Successfull, please login.');
				res.redirect('/login')
			});
		})
	);
}

const loginForm = (req, res) => {
	if (req.session.user) {
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
				}else{
					req.session.user = user;
					req.user = user;
					console.log("session: ", req.session.user.email);
					console.log("logged in user: ", req.user.name);
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

const logout = (req, res) => {
	req.session.destroy();
	return res.redirect('/login');
}


module.exports = {home, registerForm, register, loginForm, login, logout}