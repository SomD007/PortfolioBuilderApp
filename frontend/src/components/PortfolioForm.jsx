import React, { useState } from 'react';

const PortfolioForm = ({ data, setData, handleInfoChange }) => {
    const [skillInput, setSkillInput] = useState('');

    // Helper to remove items from any array field
    const removeItem = (index, field) => {
        const updatedList = data[field].filter((_, i) => i !== index);
        setData({ ...data, [field]: updatedList });
    };

    const addSkill = () => {
        if (skillInput.trim()) {
            setData({ ...data, skills: [...data.skills, skillInput.trim()] });
            setSkillInput('');
        }
    };

    const addEducation = () => {
        const newEdu = { degree: '', institution: '', startDate: '', endDate: '', percentage: '' };
        setData({ ...data, education: [...data.education, newEdu] });
    };

    const updateEducation = (index, field, value) => {
        const newEdu = [...data.education];
        newEdu[index][field] = value;
        setData({ ...data, education: newEdu });
    };

    const addProject = () => {
        const newProj = { title: '', description: '', techStack: [], githubLink: '', liveLink: '' };
        setData({ ...data, projects: [...data.projects, newProj] });
    };

    const updateProject = (index, field, value) => {
        const newProj = [...data.projects];
        newProj[index][field] = value;
        setData({ ...data, projects: newProj });
    };

    return (
        <div className="form-container">
            {/* PERSONAL INFO */}
            <div className="form-section">
                <h3>👤 Personal Information</h3>
                <input name="fullname" value={data.personalInfo.fullname} onChange={handleInfoChange} placeholder="Full Name" />
                <textarea name="bio" value={data.personalInfo.bio} onChange={handleInfoChange} placeholder="Short Bio" rows="6" />
                <div className="grid-2">
                    <input name="contactEmail" value={data.personalInfo.contactEmail} onChange={handleInfoChange} placeholder="Email" />
                    <input name="location" value={data.personalInfo.location} onChange={handleInfoChange} placeholder="Location" />
                </div>
            </div>

            {/* EDUCATION */}
            <div className="form-section">
                <h3>🎓 Education</h3>
                {data.education.map((edu, index) => (
                    <div key={index} className="item-card">
                        <div className="card-header">
                            <span>Entry #{index + 1}</span>
                            <button type="button" className="btn-remove" onClick={() => removeItem(index, 'education')}>Remove</button>
                        </div>
                        <input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} />
                        <input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} />
                        <div className="grid-2">
                            <input type="date" value={edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : ''} onChange={(e) => updateEducation(index, 'startDate', e.target.value)} />
                            <input type="date" value={edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : ''} onChange={(e) => updateEducation(index, 'endDate', e.target.value)} />
                        </div>
                        <input placeholder="Percentage / Status" value={edu.percentage} onChange={(e) => updateEducation(index, 'percentage', e.target.value)} />
                    </div>
                ))}
                <button type="button" className="btn-secondary" onClick={addEducation}>+ Add Education</button>
            </div>

            {/* SKILLS */}
            <div className="form-section">
                <h3>⚡ Skills</h3>
                <div className="skill-input-wrapper">
                    <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Skill name..." />
                    <button type="button" onClick={addSkill}>Add</button>
                </div>
                <div className="tags-container">
                    {data.skills.map((skill, i) => (
                        <span key={i} className="skill-tag">
                            {skill} <b onClick={() => removeItem(i, 'skills')}>&times;</b>
                        </span>
                    ))}
                </div>
            </div>

            {/* PROJECTS */}
            <div className="form-section">
                <h3>🚀 Projects</h3>
                {data.projects.map((proj, index) => (
                    <div key={index} className="item-card">
                        <div className="card-header">
                            <span>Project #{index + 1}</span>
                            <button type="button" className="btn-remove" onClick={() => removeItem(index, 'projects')}>Remove</button>
                        </div>
                        <input placeholder="Title" value={proj.title} onChange={(e) => updateProject(index, 'title', e.target.value)} />
                        <textarea placeholder="Description" value={proj.description} onChange={(e) => updateProject(index, 'description', e.target.value)} rows="6" />
                        <input placeholder="GitHub Link" value={proj.githubLink} onChange={(e) => updateProject(index, 'githubLink', e.target.value)} />
                    </div>
                ))}
                <button type="button" className="btn-secondary" onClick={addProject}>+ Add Project</button>
            </div>
        </div>
    );
};

export default PortfolioForm;