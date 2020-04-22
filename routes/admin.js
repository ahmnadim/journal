const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const tagsController = require('../Controllers/tagsController');
const categoryController = require('../controllers/categoryController');
const auth = require('../config/auth');
const validate = require('../config/validationMiddleware');


router.get('/dashboard', auth.checkSession, adminController.dashboard);
//posts routes
router.get('/posts', auth.checkSession, adminController.posts);
router.get('/add-post', auth.checkSession, adminController.addPost);
router.post('/store-post', auth.checkSession, validate.validatePost(),validate.validate, adminController.storePost);

router.get('/edit-post/:id', auth.checkSession, adminController.editPost);
router.post('/update-post', auth.checkSession, adminController.updatPost);
router.post('/delete-post', auth.checkSession, adminController.deletePost);

//tags routes
router.get('/tags', auth.checkSession, tagsController.tags);
router.get('/add-tag', auth.checkSession, tagsController.addTag);
router.post('/store-tag', auth.checkSession, validate.validateTag(), validate.validate, tagsController.storeTag);

router.get('/edit-tag/:id',  auth.checkSession, tagsController.editForm);
router.post('/update-tag', auth.checkSession, validate.validateTag(), validate.validate,  tagsController.updatTag);

router.post('/delete-tag', auth.checkSession, tagsController.deleteTag);

//category routes
router.get('/categories', auth.checkSession, categoryController.categories);
router.get('/add-category', auth.checkSession, categoryController.addCategory);
module.exports = router;