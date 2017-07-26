var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	heroImage: { type: Types.CloudinaryImage },
	image: { type: Types.CloudinaryImages },
	project: {
		location: {type: String},
		status: { type: Types.Select, options: 'finished, process, design', default: 'finished', index: true }, 
	},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	meta: {
		description: {type:String}
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.schema.virtual('fullPostUrl').get(function() {
    return keystone.get('baseUrl') + 'projects/post/' + this.slug;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
