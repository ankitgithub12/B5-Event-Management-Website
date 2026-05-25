import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
  },
  events: {
    type: String,
  },
  instagramUrl: {
    type: String,
  },
  linkedinUrl: {
    type: String,
  },
  type: {
    type: String,
    required: true,
    enum: ['mastermind', 'lead'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;
