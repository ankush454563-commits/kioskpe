const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const ServiceRequest = require('../models/ServiceRequest');
const { protect, authorize } = require('../middleware/auth');
const { sendEmail } = require('../utils/email');

// POST /api/services/request - Submit a service request (public or authenticated)
router.post('/request',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('serviceType').isIn([
      'itr-filing',
      'company-registration',
      'ngo-registration',
      'gst-registration',
      'gst-filing',
      'legal-consultation',
      'contract-drafting',
      'compliance',
      'other'
    ]).withMessage('Valid service type is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array() });
      }

      const serviceData = {
        ...req.body,
        userId: req.user ? req.user.id : null
      };

      const serviceRequest = new ServiceRequest(serviceData);
      await serviceRequest.save();

      // Send email notification to admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Service Request - ${req.body.serviceType}`,
        html: `
          <h2>New Service Request Received</h2>
          <p><strong>Service:</strong> ${req.body.serviceType}</p>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Phone:</strong> ${req.body.phone}</p>
          <p><strong>Business Name:</strong> ${req.body.businessName || 'N/A'}</p>
          <p><strong>Business Type:</strong> ${req.body.businessType || 'N/A'}</p>
          <p><strong>Description:</strong> ${req.body.description || 'N/A'}</p>
          <p><strong>Request ID:</strong> ${serviceRequest._id}</p>
        `
      });

      // Send confirmation email to user
      await sendEmail({
        to: req.body.email,
        subject: 'Service Request Received - Kioskpe Law Firm',
        html: `
          <h2>Thank you for choosing Kioskpe Law Firm</h2>
          <p>Hi ${req.body.name},</p>
          <p>We have received your request for <strong>${req.body.serviceType}</strong>.</p>
          <p><strong>Request ID:</strong> ${serviceRequest._id}</p>
          <p>Our team will review your request and get back to you within 24-48 hours.</p>
          <p>You can track your request status using the Request ID above.</p>
          <br>
          <p>Best regards,<br>Kioskpe Law Firm</p>
        `
      });

      res.status(201).json({
        status: 'success',
        message: 'Service request submitted successfully',
        data: serviceRequest
      });
    } catch (error) {
      console.error('Service request error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to submit service request'
      });
    }
  }
);

// GET /api/services/my-requests - Get user's own service requests (authenticated)
router.get('/my-requests', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = { userId: req.user.id };
    
    if (req.query.status) {
      query.status = req.query.status;
    }

    const [requests, total] = await Promise.all([
      ServiceRequest.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('assignedTo', 'name email'),
      ServiceRequest.countDocuments(query)
    ]);

    res.json({
      status: 'success',
      data: requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch service requests'
    });
  }
});

// GET /api/services/track/:id - Track service request by ID (public)
router.get('/track/:id', async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id)
      .populate('assignedTo', 'name')
      .select('-adminNotes'); // Hide admin notes from public view

    if (!serviceRequest) {
      return res.status(404).json({
        status: 'error',
        message: 'Service request not found'
      });
    }

    res.json({
      status: 'success',
      data: serviceRequest
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch service request'
    });
  }
});

// GET /api/services/my-requests/:id - Get specific request details (authenticated)
router.get('/my-requests/:id', protect, async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('assignedTo', 'name email');

    if (!serviceRequest) {
      return res.status(404).json({
        status: 'error',
        message: 'Service request not found'
      });
    }

    res.json({
      status: 'success',
      data: serviceRequest
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch service request'
    });
  }
});

// Admin routes - require admin authorization
router.use(protect);
router.use(authorize('admin'));

// GET /api/services/all - Get all service requests (admin only)
router.get('/all', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    if (req.query.serviceType) {
      query.serviceType = req.query.serviceType;
    }

    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { businessName: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const [requests, total] = await Promise.all([
      ServiceRequest.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'name email')
        .populate('assignedTo', 'name email'),
      ServiceRequest.countDocuments(query)
    ]);

    res.json({
      status: 'success',
      data: requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch service requests'
    });
  }
});

// GET /api/services/request/:id - Get specific request (admin)
router.get('/request/:id', async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('assignedTo', 'name email')
      .populate('statusHistory.updatedBy', 'name');

    if (!serviceRequest) {
      return res.status(404).json({
        status: 'error',
        message: 'Service request not found'
      });
    }

    res.json({
      status: 'success',
      data: serviceRequest
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch service request'
    });
  }
});

// PUT /api/services/request/:id/status - Update status (admin)
router.put('/request/:id/status',
  [
    body('status').isIn(['pending', 'under-review', 'documents-required', 'in-progress', 'completed', 'rejected'])
      .withMessage('Valid status is required'),
    body('note').optional().trim()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array() });
      }

      const serviceRequest = await ServiceRequest.findById(req.params.id)
        .populate('userId', 'name email');

      if (!serviceRequest) {
        return res.status(404).json({
          status: 'error',
          message: 'Service request not found'
        });
      }

      // Add to status history
      serviceRequest.statusHistory.push({
        status: req.body.status,
        note: req.body.note,
        updatedBy: req.user.id,
        updatedAt: new Date()
      });

      serviceRequest.status = req.body.status;
      
      if (req.body.status === 'completed') {
        serviceRequest.completedDate = new Date();
      }

      await serviceRequest.save();

      // Send email notification to user
      if (serviceRequest.email) {
        await sendEmail({
          to: serviceRequest.email,
          subject: `Service Request Status Update - ${serviceRequest.serviceType}`,
          html: `
            <h2>Status Update for Your Service Request</h2>
            <p>Hi ${serviceRequest.name},</p>
            <p>Your service request for <strong>${serviceRequest.serviceType}</strong> has been updated.</p>
            <p><strong>Request ID:</strong> ${serviceRequest._id}</p>
            <p><strong>New Status:</strong> ${req.body.status}</p>
            ${req.body.note ? `<p><strong>Note:</strong> ${req.body.note}</p>` : ''}
            <br>
            <p>Best regards,<br>Kioskpe Law Firm</p>
          `
        });
      }

      res.json({
        status: 'success',
        message: 'Status updated successfully',
        data: serviceRequest
      });
    } catch (error) {
      console.error('Status update error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update status'
      });
    }
  }
);

// PUT /api/services/request/:id - Update request details (admin)
router.put('/request/:id', async (req, res) => {
  try {
    const allowedUpdates = [
      'priority',
      'assignedTo',
      'adminNotes',
      'estimatedCompletionDate'
    ];

    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const serviceRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!serviceRequest) {
      return res.status(404).json({
        status: 'error',
        message: 'Service request not found'
      });
    }

    res.json({
      status: 'success',
      data: serviceRequest
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update service request'
    });
  }
});

// DELETE /api/services/request/:id - Delete request (admin)
router.delete('/request/:id', async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByIdAndDelete(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({
        status: 'error',
        message: 'Service request not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Service request deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete service request'
    });
  }
});

// GET /api/services/stats - Get service statistics (admin)
router.get('/stats', async (req, res) => {
  try {
    const stats = await ServiceRequest.aggregate([
      {
        $facet: {
          byStatus: [
            {
              $group: {
                _id: '$status',
                count: { $sum: 1 }
              }
            }
          ],
          byServiceType: [
            {
              $group: {
                _id: '$serviceType',
                count: { $sum: 1 }
              }
            }
          ],
          byPriority: [
            {
              $group: {
                _id: '$priority',
                count: { $sum: 1 }
              }
            }
          ],
          total: [
            {
              $count: 'count'
            }
          ]
        }
      }
    ]);

    res.json({
      status: 'success',
      data: stats[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;
