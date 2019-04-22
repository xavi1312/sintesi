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
    userTohomework: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    homeworkTotag: [{
        type: Schema.Types.ObjectId, ref: 'Tag'
    }]
});

mongoose.model('Homework', homeworkSchema);