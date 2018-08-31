var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Careers = new keystone.List('Careers', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Careers.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	// heroImage: { type: Types.CloudinaryImage },
	job: {
		about: { type: Types.Html, wysiwyg: true, height: 150 },
		requirement: { type: Types.Html, wysiwyg: true, height: 400 },
	}
});

Careers.schema.virtual('content.full').get(function () {
	return this.job.about || this.job.requirement;
});

Careers.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Careers.register();
