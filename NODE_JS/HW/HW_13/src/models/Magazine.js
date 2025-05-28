const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const magazineSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  issueNumber: {
    type: Number,
    required: true
  },
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'Publisher',
    required: true
  }
}, {
  timestamps: true
});

const Magazine = mongoose.model('Magazine', magazineSchema);

module.exports = Magazine; 