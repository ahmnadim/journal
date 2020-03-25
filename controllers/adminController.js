const Post = require('../models/Post');
const User = require('../models/User');

const dashboard = (req, res, next) => {
	res.render('admin/dashboard', {
		path:'/admin/dashboard'
	}); 
}

const posts = (req, res) => {
	Post.findAll({where: {userId: req.session.user.id}}).then(posts => {
	 	res.render('admin/post/posts', {
	 	all_post: posts,
	 	path:'/admin/posts'
	 });
	});	
}

const addPost = (req, res) => {
	res.render('admin/post/add-post', {
		path:'/admin/add-post'
	});
}

const storePost = (req, res) => {
	const {title, description, author} = req.body;
	const image = req.file;

	if(!image){
		req.flash('error_msg', 'File should be and imgae.');
		return res.redirect('/admin/add-post');
	}

	const imageUrl = image.path;
	const userId = req.session.user.id;
	User.findByPk(userId)
	.then(user => {
		user.createPost({ title, imageUrl, description, author })
		.then(post => {
			req.flash('success_msg', 'Post created successfully.');
			res.redirect('/admin/posts');
		})
		.catch(err => console.log(err));

	});
	
}

const editPost = (req, res) => {
	Post.findOne( {where: {id: req.params.id, userId: req.session.user.id}} )
	.then(data => {
			if(!data){
				req.flash('error_msg', 'You can only edit your own post.');
				res.redirect('/admin/posts');
			}
			res.render('admin/post/edit-post', {
			post: data,
			path:'/admin/edit-post'
		});
	})
	.catch(err => console.log(err));

}

const updatPost = (req, res) => {
	const title = req.body.title;
	const file = req.file;
	const description = req.body.description;
	const author = req.body.author;
	

	if (file){
		const image = file.path;
		Post.update({ title, description, author }, { where: { id: req.body.id } })
			.then(() => {
				req.flash('success_msg', 'Post updated successfully.');
				res.redirect('/admin/posts')
			})
			.catch(err => console.log(err));
	}else{
		Post.update({ title, description, author }, { where: { id: req.body.id } })
			.then(() => {
				req.flash('success_msg', 'Post updated successfully.');
				res.redirect('/admin/posts')
			})
			.catch(err => console.log(err));
	}

	Post.update({title, description, author}, {where:{id:req.body.id}})
	.then(() => {
		req.flash('success_msg', 'Post updated successfully.');
		res.redirect('/admin/posts')
	})
	.catch(err => console.log(err));

}

const deletePost = (req, res) => {
	Post.destroy({where:{id:req.body.id, userId: req.session.user.id}})
	.then(() => {
		req.flash('success_msg', 'Post deleted successfully.');
		res.redirect('/admin/posts');
	})
	.catch(err => {
		req.flash('error_msg', 'You can only delete your own post.');
		res.redirect('/admin/posts');
	});
}

module.exports = {dashboard, posts, addPost, storePost, editPost, updatPost, deletePost}