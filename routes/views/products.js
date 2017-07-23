var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'products';
	locals.data = {
		posts: [],
		categories: [],
	};

	// Load the products by sortOrder
	view.query('products', keystone.list('Products').model.find().sort('sortOrder'));

	// Render the view
	view.render('products');

};
