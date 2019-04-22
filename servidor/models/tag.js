const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const tagSchema = Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    homeworkTotag: [{
        type: Schema.Types.ObjectId, ref: 'Homework'
    }]
});
tagSchema.pluguin(uniqueValidator);

mongoose.model('Tag', tagSchema);