const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for guest users
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: [
      'itr-filing',
      'company-registration',
      'ngo-registration',
      'gst-registration',
      'gst-filing',
      'legal-consultation',
      'contract-drafting',
      'compliance',
      'other'
    ]
  },
  businessName: {
    type: String,
    trim: true
  },
  businessType: {
    type: String,
    enum: ['proprietorship', 'partnership', 'llp', 'private-limited', 'public-limited', 'ngo', 'trust', 'society', 'other'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'under-review', 'documents-required', 'in-progress', 'completed', 'rejected'],
    default: 'pending'
  },
  statusHistory: [{
    status: String,
    note: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  adminNotes: {
    type: String,
    trim: true
  },
  estimatedCompletionDate: {
    type: Date
  },
  completedDate: {
    type: Date
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
serviceRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
