const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    group: {
      type: String,
      enum: ['general', 'contact', 'social', 'seo', 'email', 'appearance', 'analytics'],
      default: 'general',
    },
    label: { type: String },
    description: { type: String },
    isPublic: { type: Boolean, default: false }, // Exposed to frontend via public settings API
  },
  { timestamps: true }
);

settingsSchema.index({ group: 1 });
settingsSchema.index({ isPublic: 1 });

// Static method to get setting by key
settingsSchema.statics.getValue = async function (key, defaultVal = null) {
  const setting = await this.findOne({ key });
  return setting ? setting.value : defaultVal;
};

// Static method to set/upsert a setting
settingsSchema.statics.setValue = async function (key, value, group = 'general') {
  return await this.findOneAndUpdate(
    { key },
    { key, value, group },
    { upsert: true, new: true, runValidators: true }
  );
};

module.exports = mongoose.model('Settings', settingsSchema);
