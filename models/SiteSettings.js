var keystone = require('keystone');
var Types = keystone.Field.Types;

var SiteSettings = new keystone.List('SiteSettings', {
	map: { name: 'websiteName' },
//    autokey: { path: 'slug', from: 'title', unique: true },
});
SiteSettings.add({
	websiteName: { type: String },
    websiteDescription: { type: String },
    websiteImage: { type: Types.CloudinaryImage, label: "Website Image (stored as cloudinary object)", select: true }
//    slug: { type: String, readonly: true },
//    includeInNav: { type: Types.Boolean }
});

SiteSettings.register();

exports = module.exports = SiteSettings;