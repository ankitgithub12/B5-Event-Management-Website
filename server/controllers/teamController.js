import TeamMember from '../models/TeamMember.js';
import { cloudinary } from '../config/cloudinaryConfig.js';

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
export const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({});
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a team member
// @route   POST /api/team
// @access  Private/Admin
export const createTeamMember = async (req, res) => {
  try {
    const { name, role, bio, type, specialty, events, instagramUrl, linkedinUrl, isActive } = req.body;
    let imageUrl = '';
    let cloudinaryId = '';

    if (req.file) {
      imageUrl = req.file.path;
      cloudinaryId = req.file.filename;
    }

    const teamMember = new TeamMember({
      name,
      role,
      bio,
      type,
      specialty,
      events,
      instagramUrl,
      linkedinUrl,
      isActive: isActive === 'true' || isActive === true,
      imageUrl,
      cloudinaryId,
    });

    const createdTeamMember = await teamMember.save();
    res.status(201).json(createdTeamMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update team member details
// @route   PUT /api/team/:id
// @access  Private/Admin
export const updateTeamMember = async (req, res) => {
  try {
    const { name, role, bio, type, specialty, events, instagramUrl, linkedinUrl, isActive } = req.body;
    const teamMember = await TeamMember.findById(req.params.id);

    if (teamMember) {
      teamMember.name = name || teamMember.name;
      teamMember.role = role || teamMember.role;
      teamMember.bio = bio || teamMember.bio;
      teamMember.type = type || teamMember.type;
      
      // Allow clearing specialty/events/socials by sending empty strings, but keep existing if undefined
      teamMember.specialty = specialty !== undefined ? specialty : teamMember.specialty;
      teamMember.events = events !== undefined ? events : teamMember.events;
      teamMember.instagramUrl = instagramUrl !== undefined ? instagramUrl : teamMember.instagramUrl;
      teamMember.linkedinUrl = linkedinUrl !== undefined ? linkedinUrl : teamMember.linkedinUrl;

      if (isActive !== undefined) {
        teamMember.isActive = isActive === 'true' || isActive === true;
      }

      if (req.file) {
        // Delete old image if it is not a seeded image
        if (teamMember.cloudinaryId && !teamMember.cloudinaryId.startsWith('seeded_')) {
          try {
            await cloudinary.uploader.destroy(teamMember.cloudinaryId);
          } catch (err) {
            console.error('Failed to delete image from Cloudinary', err);
          }
        }
        teamMember.imageUrl = req.file.path;
        teamMember.cloudinaryId = req.file.filename;
      }

      const updatedTeamMember = await teamMember.save();
      res.json(updatedTeamMember);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (teamMember) {
      // Delete from Cloudinary if not a seeded image
      if (teamMember.cloudinaryId && !teamMember.cloudinaryId.startsWith('seeded_')) {
        try {
          await cloudinary.uploader.destroy(teamMember.cloudinaryId);
        } catch (err) {
          console.error('Failed to delete image from Cloudinary', err);
        }
      }
      await TeamMember.deleteOne({ _id: teamMember._id });
      res.json({ message: 'Team member removed' });
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
