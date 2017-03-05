var keystone = require('keystone');
var views = keystone.importer(__dirname)('./views');

exports = module.exports = function(req, res) {
    var locals = res.locals;
	
    var currentPageQuery = keystone.list('BasePage').model.findOne({
		slug: req.params.slug
	});
    var siteSettingQuery = keystone.list('SiteSettings').model.find({}).limit(1);
    
	currentPageQuery.exec()
    .then(function(page) {

        if (!page) {
            return res.status(404).send('Page Not Found!');
        }

        locals.page = page;
        locals.section = req.params.slug;

        console.log(page.constructor.view_name);

        return siteSettingQuery.exec();
    })
    .then(function(siteSettings) {

        locals.imageUrl = siteSettings[0].websiteImage != null ? siteSettings[0].websiteImage.url : "";

        // return page view
        if (locals.page.constructor.view_name) {
            return views[locals.page.constructor.view_name](req, res);
        } else {
            return views.standard_page(req, res);
        }
    });
//    .catch(function(err) {
//       return res.status(404).send('Page Not Found!');
//    });
};