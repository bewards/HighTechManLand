var keystone = require('keystone');
var Types = keystone.Field.Types;
var BasePage = require('./BasePage');

var ContentPage = new keystone.List('ContentPage', { inherits: BasePage });
ContentPage.add({
	content: { type: Types.Html, wysiwyg: true }
});
ContentPage.schema.statics.view_name = 'content_page';
ContentPage.register();