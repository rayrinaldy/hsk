var keystone = require('keystone');

/**
 * ProductsCategory Model
 * ==================
 */

var ProductsCategory = new keystone.List('ProductsCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ProductsCategory.add({
	name: { type: String, required: true },
});

ProductsCategory.relationship({ ref: 'Products', path: 'products', refPath: 'categories' });

ProductsCategory.register();
