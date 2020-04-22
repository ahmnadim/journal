const categories = (req, res)=> {
    res.render('admin/category/categories',{
        path: '/admin/category',
        all_categories: ''
    });
}

const addCategory = (req, res) => {
    res.render('admin/category/add-category', {
        path: '/admin/category/add-category'
    });
}

module.exports = {categories, addCategory}