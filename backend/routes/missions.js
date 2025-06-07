const express = require('express');
const Mission = require('../models/Mission');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const mission = new Mission({ ...req.body, createdBy: req.adminId });
    await mission.save();
    res.json(mission);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create mission' });
  }
});

router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find({ createdBy: req.adminId });
    res.json(missions);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch missions' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mission = await Mission.findOne({ _id: req.params.id, createdBy: req.adminId });
    if (!mission) return res.status(404).json({ msg: 'Mission not found' });
    res.json(mission);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch mission' });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    let { status } = req.body;
    // Accept 'inactive' as an alias for 'complete'
    if (status === 'inactive') status = 'complete';
    if (!['active', 'complete'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status value' });
    }
    const mission = await Mission.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.adminId },
      { status },
      { new: true }
    );
    if (!mission) return res.status(404).json({ msg: 'Mission not found' });
    res.json(mission);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update status' });
  }
});

module.exports = router;