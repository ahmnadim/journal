const {body, check, validationResult } = require('express-validator');

// Models
const User = require('../models/User');


module.exports = {
    validate: (req, res, next) => {
        backURL = req.header('Referer') || '/';

        var errors = validationResult(req)
        if (errors.isEmpty()) 	{
            return next()
        }
        
        req.flash('errors', errors.array());
        return res.redirect(backURL);
    },

    validateLogin: (req, res, next) => {
        return [
            body('email').isEmail().withMessage('Enter valid email.'),
            body('password').isLength({ min: 1 }).withMessage('Password is reqired.')
        ];
    },

    validateRegistration: (req, res, next) => {
       return [
           body('name').isLength({ min: 6 }).withMessage('Your name should have at least 6 characters.'),

           body('email').isEmail().withMessage('Please enter a valid e-mail.').custom((value, { req }) => {
               return User.findOne({ where: { email: value } })
                   .then(user => {
                       if (user) {
                           return Promise.reject('E-mail already in use, try another one.')
                       }
                   });
           }),

           body('password').isLength({ min: 5 }).withMessage('Your password should have minimum 6 characters.'),

           check('confirm_password').custom((value, { req }) => {
               if (value !== req.body.password) {
                   throw new Error('Password confirmation does not match.');
               }
               return true;
           })
       ];
    },

    validateTag: (req, res, next) => {
       return body('name').isLength({min: 3}).withMessage('Tag title required.');
    },

    validatePost: (req, res, next) => {
        return [
            body('title').isLength({min: 8}).withMessage('Title is required.'),
            body('description').isLength({ min: 8 }).withMessage('Description is required.'),
            body('author').isLength({ min: 2 }).withMessage('Author is required.'),
        ];
    }

};