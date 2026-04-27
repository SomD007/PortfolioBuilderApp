const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    maintenanceMessage: {
        type: String,
        default: "This template is currently under maintenance."
    }
}, { timestamps: true });

module.exports = mongoose.models.Template || mongoose.model('Template', TemplateSchema);
