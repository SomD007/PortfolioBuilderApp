import React from 'react';

const PortfolioPreview = ({ data }) => {
    return (
        <div className="resume-paper">
            {/* 1. HEADER & BIO */}
            <header className="preview-header">
                <h1>{data.personalInfo.fullname || "Your Name"}</h1>
                <p className="contact-info">
                    {data.personalInfo.location} {data.personalInfo.location && '|'} {data.personalInfo.contactEmail}
                </p>
                {/* BIO IS ADDED HERE */}
                {data.personalInfo.bio && (
                    <div className="bio-section">
                        <p className="preview-bio">{data.personalInfo.bio}</p>
                    </div>
                )}
            </header>

            {/* --- SKILLS SECTION (Added Fix) --- */}
            {data.skills && data.skills.length > 0 && (
                <section className="preview-section">
                    <h3>Technical Skills</h3>
                    <div className="preview-skills-container">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="preview-skill-badge">
                                {skill}{i < data.skills.length - 1 ? ' • ' : ''}
                            </span>
                        ))}
                    </div>
                </section>
            )}


            {/* 2. EDUCATION SECTION */}
            {data.education.length > 0 && (
                <section className="preview-section">
                    <h3>Education</h3>
                    {data.education.map((edu, i) => (
                        <div key={i} className="preview-item">
                            <div className="flex-between">
                                <strong>{edu.degree}</strong>
                                <span>{edu.percentage}</span>
                            </div>
                            <p>{edu.institution}</p>
                            <small>{edu.startDate} - {edu.endDate}</small>
                        </div>
                    ))}
                </section>
            )}

            {/* --- PROJECTS SECTION (GitHub Fix) --- */}
            {data.projects && data.projects.length > 0 && (
                <section className="preview-section">
                    <h3>Projects</h3>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="preview-item">
                            <div className="flex-between">
                                <strong>{proj.title}</strong>
                                {/* GITHUB LINK VISIBILITY */}
                                {proj.githubLink && (
                                    <a href={proj.githubLink} target="_blank" rel="noreferrer" className="preview-link">
                                        GitHub ↗
                                    </a>
                                )}
                            </div>
                            <p className="proj-desc">{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default PortfolioPreview;