
const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// Create a new log entry
router.post('/log', async (req, res) => {
  try {
    const { timestamp, action } = req.body;
    
    if (!action) {
      return res.status(400).json({ message: 'Action is required' });
    }

    const newLog = new Log({
      timestamp: timestamp || Date.now(),
      action
    });

    const savedLog = await newLog.save();
    
    res.status(201).json({
      message: 'Log entry created successfully',
      log: savedLog
    });
  } catch (error) {
    console.error('Error creating log entry:', error);
    res.status(500).json({ message: 'Failed to create log entry' });
  }
});

// Get all log entries (for testing purposes)
router.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
});

module.exports = router;
