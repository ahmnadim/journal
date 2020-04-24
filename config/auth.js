	module.exports = {
		ensureAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash('error_msg', 'Please log in to view that resource');
		res.redirect('/login');
		},
		forwardAuthenticated: function(req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		}
		res.redirect('/admin/dashboard');      
		},
		checkSession: (req, res, next) => {
			if ((req.session.user == undefined) || !req.session.user) {
				return res.redirect('/login');
			}
			
			next();
		},

		// checkSessionIF: (req, res, next) => {
		// 	if (!req.session.user) {
		// 		res.redirect('/login');
		// 	}

		// 	next();
		// }

	};