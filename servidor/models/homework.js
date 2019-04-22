const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeworkSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    constent: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    alert: {
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    tag: [{
        type: Schema.Types.ObjectId, ref: 'Tag'
    }]
});

mongoose.model('Homework', homeworkSchema);