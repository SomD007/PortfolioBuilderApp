const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/admin');

// @route   GET /api/notices/active
// @desc    Get the latest active notice
// @access  Public
router.get('/active', async (req, res) => {
    try {
        const notice = await Notice.findOne({ isActive: true }).sort({ createdAt: -1 });
        res.json(notice);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/notices
// @desc    Get all notices (for admin dashboard)
// @access  Private/Admin
router.get('/', [auth, admin], async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 });
        res.json(notices);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/notices
// @desc    Create a new notice
// @access  Private/Admin
router.post('/', [auth, admin], async (req, res) => {
    const { message, type, expiresAt } = req.body;

    try {
        // Deactivate other notices if this one is active (optional, but keeps UI clean)
        await Notice.updateMany({ isActive: true }, { isActive: false });

        const newNotice = new Notice({
            message,
            type,
            expiresAt
        });

        const notice = await newNotice.save();
        res.json(notice);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/notices/:id
// @desc    Toggle notice status or edit
// @access  Private/Admin
router.put('/:id', [auth, admin], async (req, res) => {
    const { message, type, isActive, expiresAt } = req.body;

    try {
        let notice = await Notice.findById(req.params.id);
        if (!notice) return res.status(404).json({ msg: 'Notice not found' });

        notice.message = message || notice.message;
        notice.type = type || notice.type;
        notice.isActive = isActive !== undefined ? isActive : notice.isActive;
        notice.expiresAt = expiresAt || notice.expiresAt;

        await notice.save();
        res.json(notice);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/notices/:id
// @desc    Delete a notice
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) return res.status(404).json({ msg: 'Notice not found' });

        await notice.deleteOne();
        res.json({ msg: 'Notice removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
