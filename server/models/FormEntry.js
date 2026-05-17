import mongoose from 'mongoose';

const formEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  formType: {
    type: String,
    enum: ['Contact', 'CustomPlanner', 'General'],
    default: 'General',
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Replied'],
    default: 'New',
  },
}, {
  timestamps: true,
});

const FormEntry = mongoose.model('FormEntry', formEntrySchema);

export default FormEntry;
