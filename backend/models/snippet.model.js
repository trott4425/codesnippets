const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Snippet = new Schema({
    snippet_short_description: {
        type: String
    },

    snippet_description: {
        type: String
    },
    snippet_author: {
        type: String
    },
    snippet_tags: {
        type: Array
    },
    snippet_code: {
        type: String
    }
});

module.exports = mongoose.model('Snippet', Snippet);