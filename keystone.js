// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Hegar Sumber Kreasi',
	'brand': 'Hegar Sumber Kreasi',
	'keywords': 'indonesia, company, indonesia, company',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	// 'session store': 'connect-mongo',
	'session store': 'connect-redis', // https://www.npmjs.com/package/connect-redis
    'session store options': {
        host: process.env.redisHost || 'localhost', // Redis server hostname
        port: process.env.redisPort || 6379, // Redis server port
        pass: process.env.redisPrimaryKey || process.env.redisSecondaryKey || null, // Password for Redis authentication
    },
	'auth': true,
	'user model': 'User',

	'wysiwyg override toolbar': false,
	'wysiwyg menubar': true,
	'wysiwyg skin': 'lightgray',
	'wysiwyg additional options' : {
		forced_root_block: false
	},
	'wysiwyg additional plugins': 'table',
  	// 'wysiwyg additional buttons': 'image',
	// 'wysiwyg images': true,
	'wysiwyg cloudinary images': true,

	'port' : process.env.PORT || 9001,

});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories', 'careers'],
	products: 'products',
	// products: [
	// {
	// 	label: 'Products',
	// 	key: 'galleries',
	// 	path: '/keystone/galleries'
	// }],
	enquiries: 'enquiries',
	users: 'users',
});

keystone.set('baseUrl', (keystone.get('env') == 'production') ? 'https://www.hegarsumberkreasi.co.id/' : 'http://localhost:3000/');

keystone.set('cloudinary secure', true);

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}


keystone.start();
