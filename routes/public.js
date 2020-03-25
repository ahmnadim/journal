const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const publicController = require('../controllers/publicController');
const auth = require('../config/auth');
const User = require('../models/User');

const validate = require('../config/validationMiddleware');

router.get('/', publicController.home );

router.get('/register', publicController.registerForm);
router.post('/register', validate.validateRegistration(),validate.validate, publicController.register);

router.get('/login', publicController.loginForm);
router.post('/login', validate.validateLogin(),validate.validate, publicController.login);
router.get('/logout', publicController.logout);

module.exports = router;