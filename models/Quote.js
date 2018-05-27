const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuoteSchema = new Schema({
    article: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
});

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;