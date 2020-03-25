//importing dependencies
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const path = require('path');
const passport = require('passport');
const validator = require('express-validator');
const multer = require('multer');

const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const toastr = require('express-toastr');

//importing models
const User = require('./models/User');
const Post = require('./models/Post');
const Tag = require('./models/Tag');
const Category = require('./models/Category');
const CategoryPost = require('./models/CategoryPost');
const PostTag = require('./models/PostTag');

const app = express();

require('./config/passport')(passport);

// Init Toastr
app.use(cookieParser('secret'));
app.use(session({
  	secret: 'secret', 
  	saveUninitialized: true,
  	resave: true
}));
app.use(flash());
app.use(toastr());

app.use(function (req, res, next) {
	
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.errors = req.flash('errors');
	next();
})

// Init Passport
app.use(passport.initialize());
app.use(passport.session());

//configuring multer storage for images
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString().replace(/:/g, '-')
									+ '-' + file.originalname);
	}
});

//filtering images
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' ||
		 file.mimetype === 'image/jpg' ||
		 file.mimetype === 'image/jpeg')
	{
		cb(null, true);
	}else{
		cb(null, false);
	}
};

// Init bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

// Set View Engine
app.set('view engine', 'ejs');

// Set Route Path
app.use('/', require('./routes/public'));
app.use('/admin', require('./routes/admin'));

//serve static files
app.use(express.static(__dirname+ '/public'));

//creating relations 
User.hasMany(Post, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Tag);
User.hasMany(Category);
Post.belongsToMany(Category, {through: CategoryPost});
Post.belongsToMany(Tag, { through: PostTag });

//syncing db
db.sync()
.then(restult => {
	// console.log(restult)
	app.listen(3000, console.log('server running.'));
})
.catch(err => console.log(err));

// const PORT = process.env.PORT || 3000;