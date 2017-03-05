var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
    
    //locals.section = "content_page";          // section is set dynamically by the /:slug in route
    locals.metaTitle = locals.page.metaDescription;
    
	view.render('content_page');
};