const Settings = require('../models/Settings');

// @desc    Get public settings (for frontend)
// @route   GET /api/settings/public
exports.getPublicSettings = async (req, res) => {
  const settings = await Settings.find({ isPublic: true }).lean();
  const result = {};
  settings.forEach((s) => (result[s.key] = s.value));
  res.status(200).json({ success: true, data: result });
};

// @desc    Get all settings (admin)
// @route   GET /api/settings
exports.getAllSettings = async (req, res) => {
  const { group } = req.query;
  const filter = group ? { group } : {};
  const settings = await Settings.find(filter).lean();
  const result = {};
  settings.forEach((s) => (result[s.key] = { value: s.value, group: s.group, label: s.label }));
  res.status(200).json({ success: true, data: result });
};

// @desc    Update settings (admin) — bulk update
// @route   PUT /api/settings
exports.updateSettings = async (req, res) => {
  const updates = req.body; // { key: value, key2: value2 }
  await Promise.all(
    Object.entries(updates).map(([key, value]) =>
      Settings.findOneAndUpdate(
        { key },
        { value },
        { upsert: true, new: true }
      )
    )
  );
  res.status(200).json({ success: true, message: 'Settings updated' });
};
