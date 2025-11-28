const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { ContactInquiry } = require('../models/Contact');
const { sendEmail } = require('../utils/email');

// POST /api/contact/inquiry - Submit Contact Form
router.post('/inquiry',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('subject').isIn(['general', 'legal', 'business', 'compliance', 'support']).withMessage('Valid subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array() });
      }

      const inquiry = new ContactInquiry(req.body);
      await inquiry.save();

      // Send auto-reply
      await sendEmail({
        to: req.body.email,
        subject: 'We Received Your Message - LetsLegal',
        html: `
          <h2>Thank You for Contacting Us</h2>
          <p>Dear ${req.body.name},</p>
          <p>We have received your message and will respond within 24 hours.</p>
          <p><strong>Subject:</strong> ${req.body.subject}</p>
          <p><strong>Your Message:</strong></p>
          <p>${req.body.message}</p>
          <p>Best regards,<br>LetsLegal Team</p>
        `
      });

      // Notify admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Inquiry - ${req.body.subject}`,
        html: `
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Phone:</strong> ${req.body.phone}</p>
          <p><strong>Subject:</strong> ${req.body.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${req.body.message}</p>
        `
      });

      res.status(201).json({
        status: 'success',
        message: 'Inquiry submitted successfully',
        data: inquiry
      });
    } catch (error) {
      console.error('Contact inquiry error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to submit inquiry'
      });
    }
  }
);

// GET /api/contact/inquiries - Get all inquiries (admin)
router.get('/inquiries', async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
    res.json({
      status: 'success',
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch inquiries'
    });
  }
});

module.exports = router;
