const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const BookSchema = new Schema({
  _id: { type: Number },
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true },
  publishedOn: { type: Number, required: true },
  numberOfPages: { type: Number, required: true, min: 1 },
},
{
  versionKey: false,
  _id: false,
});

BookSchema.plugin(AutoIncrement);

module.exports = mongoose.model('book', BookSchema);
