const express = require('express');
const router = express.Router();
const passport = require('passport');
const { check, validationResult } = require('express-validator');

const publicController = require('../controllers/publicController');
const auth = require('../config/auth');


const validate = require('../config/validationMiddleware');


router.get('/', publicController.home );

router.get('/register', auth.forwardAuthenticated, publicController.registerForm);
router.post('/register', validate.validateRegistration(),validate.validate, publicController.register);

router.get('/login', auth.forwardAuthenticated, publicController.loginForm);
// router.post('/login', validate.validateLogin(),validate.validate, publicController.login);
router.post('/login', validate.validateLogin(),validate.validate, (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/admin/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });
router.get('/verify/:token', publicController.verify);
router.get('/logout', publicController.logout);

module.exports = router;