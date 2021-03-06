import mongoose from 'mongoose';

export const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  description: {
    type: String,
    required: false,
    minlength: 10,
    maxlength: 2500,
  },
  blips: [{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Blip',
    required: false,
  }],
});

export const Project = mongoose.model('Project', projectSchema, 'projects');
