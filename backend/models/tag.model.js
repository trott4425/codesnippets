const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tag = new Schema({
    tag_name: {
        type: String
    }
});

module.exports = mongoose.model('Tag', Tag);