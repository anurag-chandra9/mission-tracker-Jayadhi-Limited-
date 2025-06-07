const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
  name: String,
  description: String,
  priority: String,
  status: { type: String, enum: ['active', 'complete'], default: 'active' },
  startDate: Date,
  eta: Date,
  location: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  logs: [String],
});

module.exports = mongoose.model('Mission', MissionSchema);