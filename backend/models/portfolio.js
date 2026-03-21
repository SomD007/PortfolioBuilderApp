const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    // CONNECTION: Links the portfolio to a specific User ID
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // PUBLIC URL: e.g., portfolio.com/soumajit-dev (Feature #9)
    slug: {
        type: String,
        required: true,
        unique: true
    },
    // BASIC INFO (Section 1)
    personalInfo: {
        fullname: String,
        bio: String,
        avatarUrl: String, // Cloudinary link (Feature #8)
        contactEmail: String,
        location: String

    },


    // EDUCATION SECTION (Newly Added)
    education: [{
        degree: String, // Bachelors, Masters, 10th, 12th, etc.
        institution: String, // School/College name
        startDate: Date,
        endDate: Date,
        percentage: String // "90%" or "Pursuing"
    }],


    // SKILLS & PROJECTS (Section 1 & 2)
    skills: [String],
    projects: [{
        title: String,
        description: String,
        techStack: [String],
        githubLink: String,
        liveLink: String
    }],
    // CUSTOMIZATION (Feature #11)
    settings: {
        theme: {type: String, default: 'minimal'},
        primaryColor: {type: String, default: '#007bff' },
        darkmode: {type: Boolean, default: false }
    },

    // ADVANCED FEATURES (Section 3)
    aiData: {
        careerPersona: String, // Feature #16
        atsScore: Number,       // Feature #20
        aiRoastFeedback: String // Feature #24
    }

}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);