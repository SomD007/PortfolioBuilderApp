import React from 'react';
import '../css/PortfolioPreview.css';

const THEMES = {
  dark: DarkSidebarTheme,
  glass: GlassTheme,
  minimal: MinimalTheme,
  cyber: CyberpunkTheme,
  professional: ProfessionalTheme,
  neumorphic: NeumorphicTheme
};

const PortfolioPreview = ({ data }) => {
  const theme = data.settings?.theme || 'minimal';
  const accent = data.settings?.primaryColor || '#3b3bf7';
  const textColor = data.settings?.textColor || (theme === 'dark' || theme === 'cyber' ? '#ffffff' : '#333333');

  //   const styleVars = {
  //   '--accent': accent,
  //   '--accent-low': `${accent}33`,
  //   '--text-main': textColor, // Add this line
  //   color: 'var(--text-main)', // Tell the container to use the variable
  //   height: 'auto',
  //   overflowY: 'auto'
  // };


  const styleVars = {
    '--accent': accent,
    '--accent-low': `${accent}33`,
    '--text-main': textColor,
    color: 'var(--text-main)',
    // FIX: Set a fixed height for the preview window and enable scrolling
    height: '600px',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    backgroundColor: theme === 'dark' ? '#0f172a' : theme === 'cyber' ? '#000' : '#fff'
  };


  const ThemeComponent = THEMES[theme] || THEMES.minimal;
  return (
    <div className="preview-container" style={styleVars}>
      <ThemeComponent data={data} accent={accent} />
    </div>
  );
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  // This returns "April 2026" or "Apr 2026" - much cleaner for a portfolio
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
};

// --- SHARED DATA COMPONENT ---
const DataList = ({ title, items, renderItem, accent }) => (
  <section className="preview-section">
    <h3 className="section-title" style={{ color: accent, borderBottom: `2px solid ${accent}22` }}>{title}</h3>
    {items && items.length > 0 ? (
      <div className="items-container">{items.map(renderItem)}</div>
    ) : (
      <p className="empty-msg">Add your {title.toLowerCase()} in the form to see them here.</p>
    )}
  </section>
);

// --- THEME 1: DARK SIDEBAR ---
function DarkSidebarTheme({ data, accent }) {
  const { personalInfo, skills, projects, education } = data;
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Get the bounding rectangle of the container to calculate relative position
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // "Soft yellowish spotlight" - using a warm amber tone with low opacity
const spotlightStyle = {
  background: `radial-gradient(
    800px circle at ${mousePos.x}px ${mousePos.y}px, 
    rgba(253, 224, 71, 0.12) 0%, 
    rgba(234, 179, 8, 0.05) 30%, 
    transparent 70%
  )`
};



  return (
    <div className="theme-dark" onMouseMove={handleMouseMove}>
      {/* This div acts as the spotlight layer */}
      <div className="spotlight-layer" style={spotlightStyle}></div>
      <div className="sidebar-dark">
        <h2 className="profile-name">{personalInfo.fullname || "Your Name"}</h2>
        <p className="profile-contact">{personalInfo.location} <br /> {personalInfo.contactEmail}</p>
        <DataList title="Skills" items={skills} accent={accent} renderItem={(s, i) => <span key={i} className="skill-badge-dark">{s}</span>} />
      </div>
      <div className="content-dark">
        <section className="bio-box">
          <h2>Professional Summary</h2>
          <p>{personalInfo.bio}</p>
        </section>
        <DataList title="Education" items={education} accent={accent} renderItem={(edu, i) => (
          <div key={i} className="preview-item">
            <div className="flex-between"><strong>{edu.degree}</strong> <span className="stat">{edu.percentage}%</span></div>
            <p className="sub-text">{edu.institution}</p>
            <small className="date-text">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</small>
          </div>
        )} />
        <DataList title="Projects" items={projects} accent={accent} renderItem={(p, i) => (
          <div key={i} className="preview-item">
            <div className="flex-between">
              <strong>{p.title}</strong>
              {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="github-link">Source ↗</a>}
            </div>
            <p className="desc-text">{p.description}</p>
          </div>
        )} />
      </div>
    </div>

  );
}

// --- THEME 2: GLASSMORPHISM ---
function GlassTheme({ data, accent }) {
  const { personalInfo, skills, projects, education } = data;
  return (
    <div className="theme-glass">
      <div className="glass-card main-header">
        <h1>{personalInfo.fullname}</h1>
        <p>{personalInfo.location} | {personalInfo.contactEmail}</p>
        <p className="glass-bio">{personalInfo.bio}</p>
        <div className="glass-card">
          <DataList title="Skills" items={skills} accent="#fff" renderItem={(s, i) => (
            <span key={i} style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '4px', margin: '3px', display: 'inline-block', fontSize: '12px' }}>{s}</span>
          )} />
        </div>
      </div>
      <div className="glass-grid">
        <div className="glass-card">
          <DataList title="Education" items={education} accent="#fff" renderItem={(edu, i) => (
            <div key={i} className="glass-item">
              <strong>{edu.degree}</strong> ({edu.percentage})<br />
              <small>{edu.institution}</small>
            </div>
          )} />
        </div>
        <div className="glass-card">
          <DataList title="Projects" items={projects} accent="#fff" renderItem={(p, i) => (
            <div key={i} className="glass-item">
              <strong>{p.title}</strong>
              <p>{p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="github-link">Source ↗</a>}</p>
              <p>{p.description}</p>

            </div>
          )} />
        </div>
      </div>
    </div>
  );
}

// --- THEME 3: MINIMAL ---
function MinimalTheme({ data, accent }) {
  const { personalInfo, education, projects, skills } = data;
  return (
    <div className="theme-minimal">
      <header className="minimal-header">
        <div className="name-reveal-container">
          <h1 className="typing-text" style={{ borderLeft: `8px solid ${accent}` }}>
            {personalInfo.fullname}
            {/* <span className="typing-effect"></span> */}
          </h1>
        </div>

        <p>{personalInfo.location} | {personalInfo.contactEmail}</p>
      </header>
      <div className="minimal-content">
        <p className="minimal-bio">{personalInfo.bio}</p>
        <DataList title="Technical Expertise" items={skills} accent={accent} renderItem={(s, i) => <span key={i}>• {s} </span>} />
        <DataList title="Education" items={education} accent={accent} renderItem={(edu, i) => (
          <div key={i} className="min-item reveal-item" style={{ animationDelay: `${i * 0.1}s` }}>
            <strong>{edu.degree}</strong> — {edu.institution}
          </div>
        )} />
        <DataList title="Projects" items={projects} accent={accent} renderItem={(p, i) => (
          <div key={i} className="min-item">
            <strong>{p.title}</strong>: {p.description} <br /><p>{p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="github-link">Source ↗</a>}</p>
          </div>
        )} />
      </div>
    </div>
  );
}

// --- THEME 4: CYBERPUNK ---
function CyberpunkTheme({ data, accent }) {
  const { personalInfo, skills, projects, education } = data;
  return (
    <div className="theme-cyber">
      <h1 className="cyber-glitch">{personalInfo.fullname}</h1>
      <div className="cyber-scanline"></div>
      <p className="cyber-sub">{'>'} LOCATION: {personalInfo.location} | EMAIL: {personalInfo.contactEmail}</p>
      <div className="cyber-terminal">
        <p>{'>'} USER_BIO: {personalInfo.bio}</p>
      </div>
      <DataList title="[SKILLS]" items={skills} accent={accent} renderItem={(s, i) => <span key={i}>• {s} </span>} />
      <DataList title="[RECORDS_EDUCATION]" items={education} accent={accent} renderItem={(edu, i) => (
        <div key={i} className="cyber-entry">
          [EXE] {edu.degree} // SCORE: {edu.percentage} // ORIGIN: {edu.institution}
        </div>
      )} />
      <DataList title="[RECORDS_PROJECTS]" items={projects} accent={accent} renderItem={(p, i) => (
        <div key={i} className="cyber-entry">
          [DIR] {p.title} {`->`} {p.githubLink && p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="github-link">Source ↗</a>}
          <p className="cyber-desc">{p.description}</p>
        </div>
      )} />
    </div>
  );
}

// --- THEME 5: PROFESSIONAL ---
function ProfessionalTheme({ data, accent }) {
  const { personalInfo, education, projects, skills } = data;
  return (
    <div className="theme-prof">
      <div className="prof-header" style={{ borderBottom: `3px solid ${accent}` }}>
        <h1>{personalInfo.fullname}</h1>
        <p>{personalInfo.location} | {personalInfo.contactEmail}</p>
      </div>
      <div className="prof-body">
        <section>
          <h4>PROFESSIONAL SUMMARY</h4>
          <p>{personalInfo.bio}</p>
        </section>
        <div style={{ borderTop: `3px solid ${accent}` }}>
          <DataList title="SKILLS" items={skills} accent={accent} renderItem={(s, i) => (
            <span key={i}>• {s} </span>)} />
        </div>


        <DataList title="EDUCATION" items={education} accent={accent} renderItem={(edu, i) => (
          <div key={i} className="prof-item">
            <strong>{edu.institution}</strong>
            <div className="flex-between"><span>{edu.degree}</span> <span>{edu.percentage}</span></div>
            <small>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</small>
          </div>
        )} />
        <DataList title="PROJECTS" items={projects} accent={accent} renderItem={(p, i) => (
          <div key={i} className="prof-item">
            <strong>{p.title}</strong>
            <p>{p.description}</p>
            <p>{p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="github-link">Source ↗</a>}</p>
          </div>
        )} />
      </div>
    </div>
  );
}

// --- THEME 6: NEUMORPHIC ---
function NeumorphicTheme({ data, accent }) {
  const { personalInfo, education, projects } = data;
  return (
    <div className="theme-neu">
      <div className="neu-card">
        <h2 style={{ color: accent }}>{personalInfo.fullname}</h2>
        <p>{personalInfo.location}</p>
      </div>
      <div className="neu-card">
        <p>{personalInfo.bio}</p>
      </div>
      <div className="neu-grid">
        <div className="neu-card">
          <h4>Education</h4>
          {education.map((edu, i) => <div key={i} style={{ fontSize: '12px', marginBottom: '5px' }}>• {edu.degree} ({edu.percentage})</div>)}
        </div>
        <div className="neu-card">
          <h4>Projects</h4>
          {projects.map((p, i) => <div key={i} style={{ fontSize: '12px', marginBottom: '5px' }}>• {p.title}</div>)}
        </div>
      </div>
    </div>
  );
}

export default PortfolioPreview;




// import React from 'react';

// const PortfolioPreview = ({ data }) => {
//     return (
//         <div className="resume-paper">
//             {/* 1. HEADER & BIO */}
//             <header className="preview-header">
//                 <h1>{data.personalInfo.fullname || "Your Name"}</h1>
//                 <p className="contact-info">
//                     {data.personalInfo.location} {data.personalInfo.location && '|'} {data.personalInfo.contactEmail}
//                 </p>
//                 {/* BIO IS ADDED HERE */}
//                 {data.personalInfo.bio && (
//                     <div className="bio-section">
//                         <p className="preview-bio">{data.personalInfo.bio}</p>
//                     </div>
//                 )}
//             </header>

//             {/* --- SKILLS SECTION (Added Fix) --- */}
//             {data.skills && data.skills.length > 0 && (
//                 <section className="preview-section">
//                     <h3>Technical Skills</h3>
//                     <div className="preview-skills-container">
//                         {data.skills.map((skill, i) => (
//                             <span key={i} className="preview-skill-badge">
//                                 {skill}{i < data.skills.length - 1 ? ' • ' : ''}
//                             </span>
//                         ))}
//                     </div>
//                 </section>
//             )}


//             {/* 2. EDUCATION SECTION */}
//             {data.education.length > 0 && (
//                 <section className="preview-section">
//                     <h3>Education</h3>
//                     {data.education.map((edu, i) => (
//                         <div key={i} className="preview-item">
//                             <div className="flex-between">
//                                 <strong>{edu.degree}</strong>
//                                 <span>{edu.percentage}</span>
//                             </div>
//                             <p>{edu.institution}</p>
//                             <small>{edu.startDate} - {edu.endDate}</small>
//                         </div>
//                     ))}
//                 </section>
//             )}

//             {/* --- PROJECTS SECTION (GitHub Fix) --- */}
//             {data.projects && data.projects.length > 0 && (
//                 <section className="preview-section">
//                     <h3>Projects</h3>
//                     {data.projects.map((proj, i) => (
//                         <div key={i} className="preview-item">
//                             <div className="flex-between">
//                                 <strong>{proj.title}</strong>
//                                 {/* GITHUB LINK VISIBILITY */}
//                                 {proj.githubLink && (
//                                     <a href={proj.githubLink} target="_blank" rel="noreferrer" className="preview-link">
//                                         GitHub ↗
//                                     </a>
//                                 )}
//                             </div>
//                             <p className="proj-desc">{proj.description}</p>
//                         </div>
//                     ))}
//                 </section>
//             )}
//         </div>
//     );
// };

// export default PortfolioPreview;