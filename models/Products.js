var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Products = new keystone.List('Products', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Products.add({
	name: { type: String, required: true },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
	},
	publishedDate: { type: Date, default: Date.now },
	heroImage: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Products.schema.virtual('content.full').get(function () {
	return this.content.brief;
});

Products.defaultColumns = 'name, categories';

Products.register();
