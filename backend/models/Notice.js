const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true
    },
    type: {
        type: String,
        enum: ['info', 'warning', 'maintenance', 'success'],
        default: 'info'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expiresAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
