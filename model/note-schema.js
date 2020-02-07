const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const note_schema = mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'userdata'

    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
});

module.exports = mongoose.model("notes", note_schema);