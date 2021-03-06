// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'HighTechManLand',
	'brand': 'HighTechManLand',
	
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
    
    // wysiwyg
    'wysiwyg skin': 'keystone',
    'wysiwyg cloudinary images': true,
    'wysiwyg additional plugins': 'code, codesample, anchor, fullscreen',
    'wysiwyg additional buttons': 'fontsizeselect fontselect codesample',
    'wysiwyg additional options': {
            content_css: '/styles/site.css'
    },
	
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// persist session data with MongoDB
if (process.env.NODE_ENV == "production") {
    keystone.set('session store', 'mongo');
}

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
    'pages': 'content-pages',
	'enquiries': 'enquiries',
	'users': 'users',
    'typed': ['phrases'],
//    'sitesettings': 'sitesettings'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
