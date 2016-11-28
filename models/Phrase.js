var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Phrase Model
 * ==================
 */

var Phrase = new keystone.List('Phrase', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Phrase.add({
	name: { type: Types.Html, required: true }
});

Phrase.relationship({ ref: 'Typed', path: 'phrase' });

Phrase.register();