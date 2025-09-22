import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { PortfolioData } from './supabase'

export const exportPortfolio = async (portfolio: PortfolioData, template: string = 'modern') => {
  try {
    const zip = new JSZip()
    
    // Create HTML content
    const htmlContent = generateHTML(portfolio, template)
    zip.file('index.html', htmlContent)
    
    // Create CSS content
    const cssContent = generateCSS(template)
    zip.file('styles.css', cssContent)
    
    // Create JavaScript content
    const jsContent = generateJS()
    zip.file('script.js', jsContent)
    
    // Generate and download ZIP
    const content = await zip.generateAsync({ type: 'blob' })
    const fileName = portfolio.personal_info.name 
      ? `${portfolio.personal_info.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.zip`
      : 'my-portfolio.zip'
    saveAs(content, fileName)
    
  } catch (error) {
    console.error('Error exporting portfolio:', error)
    alert('Error exporting portfolio. Please try again.')
  }
}

const generateHTML = (portfolio: PortfolioData, template: string = 'modern'): string => {
  // Check if sections have data
  const hasSkills = portfolio.skills && portfolio.skills.length > 0
  const hasProjects = portfolio.projects && portfolio.projects.length > 0
  const hasExperience = portfolio.experience && portfolio.experience.length > 0
  const hasEducation = portfolio.education && portfolio.education.length > 0
  const hasContactInfo = !!(portfolio.personal_info.email || portfolio.personal_info.phone || portfolio.personal_info.location || portfolio.personal_info.linkedin || portfolio.personal_info.github)
  if (template === 'classic') {
    return generateClassicHTML(portfolio, hasSkills, hasProjects, hasExperience, hasEducation, hasContactInfo)
  } else {
    return generateModernHTML(portfolio, hasSkills, hasProjects, hasExperience, hasEducation, hasContactInfo)
  }
}

const generateModernHTML = (portfolio: PortfolioData, hasSkills: boolean, hasProjects: boolean, hasExperience: boolean, hasEducation: boolean, hasContactInfo: boolean): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolio.personal_info.name || 'Portfolio'} - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <header class="header">
            <div class="profile">
                <div class="profile-image">
                    <i class="fas fa-user-circle"></i>
                </div>
                <h1>${portfolio.personal_info.name || 'Your Name'}</h1>
                <h2>${portfolio.personal_info.title || 'Your Title'}</h2>
                <p class="bio">${portfolio.personal_info.bio || 'Tell us about yourself...'}</p>
            </div>
            ${hasContactInfo ? `
            <div class="contact-info">
                ${portfolio.personal_info.email ? `
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>${portfolio.personal_info.email}</span>
                </div>
                ` : ''}
                ${portfolio.personal_info.phone ? `
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span>${portfolio.personal_info.phone}</span>
                </div>
                ` : ''}
                ${portfolio.personal_info.location ? `
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${portfolio.personal_info.location}</span>
                </div>
                ` : ''}
                ${portfolio.personal_info.linkedin ? `
                <div class="contact-item">
                    <i class="fab fa-linkedin"></i>
                    <a href="${portfolio.personal_info.linkedin}" target="_blank">LinkedIn Profile</a>
                </div>
                ` : ''}
                ${portfolio.personal_info.github ? `
                <div class="contact-item">
                    <i class="fab fa-github"></i>
                    <a href="${portfolio.personal_info.github}" target="_blank">GitHub Profile</a>
                </div>
                ` : ''}
            </div>
            ` : ''}
        </header>

        ${hasSkills ? `
        <!-- Skills Section -->
        <section class="skills-section">
            <h2>Skills</h2>
            <div class="skills-grid">
                ${portfolio.skills.map(skill => `
                    <span class="skill-tag">${skill}</span>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${hasProjects ? `
        <!-- Projects Section -->
        <section class="projects-section">
            <h2>Projects</h2>
            <div class="projects-grid">
                ${portfolio.projects.map(project => `
                    <div class="project-card">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                        <div class="project-links">
                            ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">Live Demo</a>` : ''}
                            ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">GitHub</a>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${hasExperience ? `
        <!-- Experience Section -->
        <section class="experience-section">
            <h2>Experience</h2>
            <div class="experience-list">
                ${portfolio.experience.map(exp => `
                    <div class="experience-item">
                        <h3>${exp.title}</h3>
                        <h4>${exp.company}</h4>
                        <p class="period">${exp.period}</p>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${hasEducation ? `
        <!-- Education Section -->
        <section class="education-section">
            <h2>Education</h2>
            <div class="education-list">
                ${portfolio.education.map(edu => `
                    <div class="education-item">
                        <h3>${edu.degree}</h3>
                        <h4>${edu.institution}</h4>
                        <p class="year">${edu.year}</p>
                        ${edu.description ? `<p>${edu.description}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </section>
        ` : ''}
    </div>

    <script src="script.js"></script>
</body>
</html>`
}

const generateClassicHTML = (portfolio: PortfolioData, hasSkills: boolean, hasProjects: boolean, hasExperience: boolean, hasEducation: boolean, hasContactInfo: boolean): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolio.personal_info.name || 'Portfolio'} - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="classic-template">
    <div class="container">
        <!-- Header Section -->
        <header class="header classic-header">
            <div class="profile">
                <h1>${portfolio.personal_info.name || 'Your Name'}</h1>
                <h2>${portfolio.personal_info.title || 'Your Title'}</h2>
                <p class="bio">${portfolio.personal_info.bio || 'Tell us about yourself...'}</p>
            </div>
            ${hasContactInfo ? `
            <div class="contact-info classic-contact">
                ${portfolio.personal_info.email ? `<p><i class="fas fa-envelope"></i> ${portfolio.personal_info.email}</p>` : ''}
                ${portfolio.personal_info.phone ? `<p><i class="fas fa-phone"></i> ${portfolio.personal_info.phone}</p>` : ''}
                ${portfolio.personal_info.location ? `<p><i class="fas fa-map-marker-alt"></i> ${portfolio.personal_info.location}</p>` : ''}
                ${portfolio.personal_info.linkedin ? `<p><i class="fab fa-linkedin"></i> <a href="${portfolio.personal_info.linkedin}" target="_blank">LinkedIn</a></p>` : ''}
                ${portfolio.personal_info.github ? `<p><i class="fab fa-github"></i> <a href="${portfolio.personal_info.github}" target="_blank">GitHub</a></p>` : ''}
            </div>
            ` : ''}
        </header>

        <div class="content-grid">
            ${hasSkills ? `
            <!-- Skills Section -->
            <section class="skills-section classic-section">
                <h2>Skills</h2>
                <div class="skills-list">
                    ${portfolio.skills.map(skill => `
                        <span class="skill-item">${skill}</span>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            ${hasProjects ? `
            <!-- Projects Section -->
            <section class="projects-section classic-section">
                <h2>Projects</h2>
                <div class="projects-list">
                    ${portfolio.projects.map(project => `
                        <div class="project-item">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="project-tech">
                                ${project.technologies.map(tech => `
                                    <span class="tech-item">${tech}</span>
                                `).join('')}
                            </div>
                            <div class="project-links">
                                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">Live Demo</a>` : ''}
                                ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">GitHub</a>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            ${hasExperience ? `
            <!-- Experience Section -->
            <section class="experience-section classic-section">
                <h2>Experience</h2>
                <div class="experience-list">
                    ${portfolio.experience.map(exp => `
                        <div class="experience-item">
                            <h3>${exp.title}</h3>
                            <h4>${exp.company}</h4>
                            <p class="period">${exp.period}</p>
                            <p>${exp.description}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            ${hasEducation ? `
            <!-- Education Section -->
            <section class="education-section classic-section">
                <h2>Education</h2>
                <div class="education-list">
                    ${portfolio.education.map(edu => `
                        <div class="education-item">
                            <h3>${edu.degree}</h3>
                            <h4>${edu.institution}</h4>
                            <p class="year">${edu.year}</p>
                            ${edu.description ? `<p>${edu.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>`
}

const generateCSS = (template: string = 'modern'): string => {
  if (template === 'classic') {
    return generateClassicCSS()
  } else {
    return generateModernCSS()
  }
}

const generateModernCSS = (): string => {
  return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.7;
    color: #1a1a1a;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

/* Premium Header Styles */
.header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    color: #1a1a1a;
    padding: 60px 40px;
    border-radius: 24px;
    margin-bottom: 40px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.profile-image {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    margin: 0 auto 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: white;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.profile h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
}

.profile h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 25px;
    color: #6b7280;
}

.bio {
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto 40px;
    color: #4b5563;
    line-height: 1.8;
}

.contact-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 20px;
    border-radius: 50px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.contact-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.contact-item a {
    color: white;
    text-decoration: none;
}

.contact-item a:hover {
    text-decoration: underline;
}

/* Premium Section Styles */
section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 40px;
    margin-bottom: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
}

section:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

section h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 30px;
    color: #1a1a1a;
    position: relative;
    padding-bottom: 15px;
}

section h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
}

/* Premium Skills Styles */
.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.skill-tag {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
}

.skill-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Premium Projects Styles */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
}

.project-card {
    background: white;
    border: 1px solid #e5e7eb;
    padding: 30px;
    border-radius: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.project-card h3 {
    color: #1a1a1a;
    margin-bottom: 15px;
    font-size: 1.4rem;
    font-weight: 700;
}

.project-card p {
    color: #6b7280;
    margin-bottom: 20px;
    line-height: 1.6;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 20px 0;
}

.tech-tag {
    background: #f3f4f6;
    color: #374151;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid #e5e7eb;
}

.project-links {
    display: flex;
    gap: 15px;
    margin-top: 20px;
}

.project-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    padding: 8px 16px;
    border: 2px solid #667eea;
    border-radius: 25px;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.project-link:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
}

/* Premium Experience & Education Styles */
.experience-list,
.education-list {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.experience-item,
.education-item {
    background: white;
    border-left: 4px solid #667eea;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.experience-item:hover,
.education-item:hover {
    transform: translateX(5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.experience-item h3,
.education-item h3 {
    color: #1a1a1a;
    margin-bottom: 8px;
    font-size: 1.2rem;
    font-weight: 700;
}

.experience-item h4,
.education-item h4 {
    color: #667eea;
    margin-bottom: 8px;
    font-size: 1rem;
    font-weight: 600;
}

.period,
.year {
    color: #6b7280;
    font-weight: 500;
    margin-bottom: 15px;
    font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 20px 15px;
    }
    
    .header {
        padding: 40px 25px;
    }
    
    .profile h1 {
        font-size: 2.5rem;
    }
    
    .contact-info {
        flex-direction: column;
        align-items: center;
    }
    
    section {
        padding: 25px;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    .profile-image {
        width: 100px;
        height: 100px;
        font-size: 40px;
    }
}`
}

const generateJS = (): string => {
  return `// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
});`
}

const generateClassicCSS = (): string => {
  return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Playfair Display', 'Times New Roman', serif;
    line-height: 1.7;
    color: #2c3e50;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
}

.classic-template {
    background: #ffffff;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 20px;
}

/* Premium Classic Header */
.classic-header {
    background: #ffffff;
    color: #2c3e50;
    padding: 60px 50px;
    border: 3px solid #2c3e50;
    margin-bottom: 40px;
    text-align: center;
    box-shadow: 0 15px 35px rgba(44, 62, 80, 0.1);
    position: relative;
    overflow: hidden;
}

.classic-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #2c3e50 0%, #3498db 50%, #2c3e50 100%);
}

.classic-header .profile h1 {
    font-size: 3.5rem;
    margin-bottom: 15px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #2c3e50;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.classic-header .profile h2 {
    font-size: 1.6rem;
    margin-bottom: 25px;
    font-style: italic;
    color: #7f8c8d;
    font-weight: 400;
}

.classic-header .bio {
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto 40px;
    line-height: 1.8;
    color: #34495e;
    font-weight: 400;
}

.classic-contact {
    text-align: left;
    max-width: 500px;
    margin: 0 auto;
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.classic-contact p {
    margin: 12px 0;
    font-size: 1rem;
    color: #2c3e50;
    display: flex;
    align-items: center;
}

.classic-contact i {
    width: 24px;
    margin-right: 12px;
    color: #3498db;
    font-size: 1.1rem;
}

.classic-contact a {
    color: #2c3e50;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.classic-contact a:hover {
    color: #3498db;
    text-decoration: underline;
}

/* Premium Content Grid */
.content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}

/* Premium Classic Section Styles */
.classic-section {
    background: #ffffff;
    padding: 40px;
    border: 2px solid #e9ecef;
    margin-bottom: 25px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    position: relative;
}

.classic-section:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.classic-section h2 {
    font-size: 2rem;
    margin-bottom: 25px;
    color: #2c3e50;
    border-bottom: 3px solid #3498db;
    padding-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    position: relative;
}

.classic-section h2::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 50px;
    height: 3px;
    background: #2c3e50;
}

/* Premium Skills Styles */
.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.skill-item {
    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    color: white;
    padding: 8px 16px;
    border: none;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 25px;
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    transition: all 0.3s ease;
}

.skill-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

/* Premium Projects Styles */
.projects-list {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.project-item {
    border: 2px solid #e9ecef;
    padding: 30px;
    background: #ffffff;
    border-radius: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    position: relative;
}

.project-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3498db 0%, #2c3e50 100%);
    border-radius: 12px 12px 0 0;
}

.project-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border-color: #3498db;
}

.project-item h3 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 1.4rem;
    font-weight: 700;
}

.project-item p {
    margin-bottom: 20px;
    line-height: 1.7;
    color: #34495e;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 20px 0;
}

.tech-item {
    background: #f8f9fa;
    color: #2c3e50;
    padding: 6px 12px;
    border: 1px solid #e9ecef;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 20px;
    transition: all 0.3s ease;
}

.tech-item:hover {
    background: #3498db;
    color: white;
    border-color: #3498db;
}

.project-links {
    display: flex;
    gap: 20px;
    margin-top: 20px;
}

.project-link {
    color: #3498db;
    text-decoration: none;
    font-weight: 600;
    padding: 10px 20px;
    border: 2px solid #3498db;
    border-radius: 25px;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.project-link:hover {
    background: #3498db;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

/* Premium Experience & Education Styles */
.experience-list,
.education-list {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.experience-item,
.education-item {
    border-left: 4px solid #3498db;
    padding-left: 25px;
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.experience-item:hover,
.education-item:hover {
    transform: translateX(5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    background: #ffffff;
}

.experience-item h3,
.education-item h3 {
    color: #2c3e50;
    margin-bottom: 8px;
    font-size: 1.3rem;
    font-weight: 700;
}

.experience-item h4,
.education-item h4 {
    color: #3498db;
    margin-bottom: 8px;
    font-size: 1.1rem;
    font-weight: 600;
}

.period,
.year {
    color: #7f8c8d;
    font-size: 0.95rem;
    margin-bottom: 15px;
    font-weight: 500;
    font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 20px 15px;
    }
    
    .classic-header {
        padding: 40px 25px;
    }
    
    .classic-header .profile h1 {
        font-size: 2.5rem;
        letter-spacing: 2px;
    }
    
    .content-grid {
        grid-template-columns: 1fr;
    }
    
    .classic-section {
        padding: 25px;
    }
    
    .classic-contact {
        padding: 20px;
    }
}`
}
