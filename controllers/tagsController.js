const Tag = require('../models/Tag');
module.exports = {
    tags: (req, res) => {
        Tag.findAll()
        .then(tags => {
            res.render('admin/tag/tags', {
                path: '/admin/tags',
                all_tag: tags
            } );
        })
    },

    addTag: (req, res) => {
        res.render('admin/tag/add-tag', {
            path: '/admin/tags'
        });
    },

    storeTag: (req, res) => {
        const {name} = req.body;

        Tag.create({name}).then(tag => {
            req.flash('success_msg', 'Tag created successfully.');
            res.redirect('/admin/tags');
        })
        .catch(err => {
            console.log(err);
        });
    },

    editForm: (req, res) => {
        Tag.findOne({where: {id: req.params.id}})
        .then(tag => {
            res.render('admin/tag/edit-tag', {
                path: '/admin/tags',
                tag: tag
            });
        })
        .catch(err => console.log(err));
        
    },

    updatTag: (req, res) => {
        Tag.update({name: req.body.name}, {where: {id: req.body.id}})
        .then(tag => {
            req.flash('success_msg', 'Tag updated successfully.');
            return res.redirect('/admin/tags');
        })
        .catch(err => console.log(err));
    }, 

    deleteTag: (req, res) => {
     
        Tag.destroy({where: {id: req.body.id}})
        .then(tag => {
            req.flash('success_msg', 'Tag deleted Successfully.');
            return res.redirect('/admin/tags');
        });
    }
}