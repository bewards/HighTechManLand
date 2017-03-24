var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var reCAPTCHA = require('recaptcha2')

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
    locals.metaTitle = "About Me | High Tech Man Land";
    locals.metaDescr = 'Contact Ben Sewards for Inquiries or just to say Hello';
	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	
	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function(next) {
		
		var newEnquiry = new Enquiry.model(),
			updater = newEnquiry.getUpdateHandler(req);
		
        var recaptcha = new reCAPTCHA({
            siteKey: '6LfefxgUAAAAAHUCBFakztVzrFNwL8Ffu0PIRO0G',
            secretKey: '6LfefxgUAAAAACABKQtA3CWGcGXOZo7H2xzAtUX_'
        });
        
        recaptcha.validate(locals.formData["g-recaptcha-response"])
        .then(function() {
            
            updater.process(req.body, {
                flashErrors: true,
                fields: 'name, email, phone, enquiryType, message',
                errorMessage: 'There was a problem submitting your enquiry:'
            }, function(err) {
                if (err) {
                    locals.validationErrors = err.errors;
                } else {
                    locals.enquirySubmitted = true;
                    
                    req.flash('success', {
                        title: "Thanks for getting in touch!",
                        detail: "Your message has been successfully sent. I'll get back to you as soon as I review your message."
                    });
                }
                next();
            });
        })
        .catch(function(errorCodes){
            locals.validationErrors.recaptchaErrors = recaptcha.translateErrors(errorCodes);
            next();
        });
		
	});
	
	view.render('contact');
	
};
