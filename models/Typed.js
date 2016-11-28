var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Typed Model
 * ==================
 */

var Typed = new keystone.List('Typed', {
    map: { name: 'title' },
	autokey: { from: 'title', path: 'key', unique: true }
});

Typed.add({
	title: { type: String, required: true },
    dataLabel: { type: String },
//    wrapInHtmlTags: { type: String, required: true },
    phraseList: { type: Types.Relationship, ref: 'Phrase', many: true }
});

Typed.register();