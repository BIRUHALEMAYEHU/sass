import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { FiPlus, FiTrash2, FiDownload, FiEye, FiLogOut } from 'react-icons/fi'
import PortfolioPreview from '../components/PortfolioPreview'

interface Project {
  id: string
  title: string
  link: string
}

interface PortfolioData {
  name: string
  about: string
  skills: string
  projects: Project[]
  contact: string
  template: number
}

// Helper functions for generating HTML and CSS
function generateHTML(data: PortfolioData): string {
  const skillsList = data.skills.split(',').map(skill => skill.trim()).filter(Boolean)
  const projectsList = data.projects.filter(project => project.title.trim())
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - Portfolio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="portfolio-container">
        <header class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">${data.name}</h1>
                <p class="hero-subtitle">${data.about}</p>
            </div>
        </header>

        <section class="skills-section">
            <div class="section-content">
                <h2>Skills & Expertise</h2>
                <div class="skills-grid">
                    ${skillsList.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        </section>

        <section class="projects-section">
            <div class="section-content">
                <h2>Featured Projects</h2>
                <div class="projects-grid">
                    ${projectsList.map(project => `
                        <div class="project-card">
                            <h3>${project.title}</h3>
                            ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project →</a>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="contact-section">
            <div class="section-content">
                <h2>Get In Touch</h2>
                <div class="contact-info">
                    <p>📧 <a href="mailto:${data.contact}">${data.contact}</a></p>
                </div>
            </div>
        </section>
    </div>
</body>
</html>`
}

function generateCSS(template: number): string {
  if (template === 1) {
    return `/* Template 1: Modern & Clean */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #1f2937;
    background-color: #f9fafb;
}

.portfolio-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 120px 0;
    text-align: center;
    margin-bottom: 80px;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 20px;
    animation: fadeIn 1s ease-in-out;
}

.hero-subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    animation: fadeIn 1s ease-in-out 0.3s both;
}

.section-content {
    background: white;
    padding: 60px;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
}

.section-content h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: #1f2937;
    text-align: center;
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}

.skill-tag {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: transform 0.2s ease;
}

.skill-tag:hover {
    transform: translateY(-2px);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.project-card {
    background: #f8fafc;
    padding: 30px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
}

.project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.project-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #1f2937;
}

.project-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
}

.project-link:hover {
    color: #1d4ed8;
}

.contact-info {
    text-align: center;
}

.contact-info a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 600;
}

.contact-info a:hover {
    color: #1d4ed8;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
    .hero-title { font-size: 2.5rem; }
    .hero-subtitle { font-size: 1.1rem; }
    .section-content { padding: 40px 20px; }
    .section-content h2 { font-size: 2rem; }
}`
  } else {
    return `/* Template 2: Creative & Dynamic */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #1f2937;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    min-height: 100vh;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.portfolio-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.hero-section {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 120px 0;
    text-align: center;
    margin: 80px 0;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
}

.hero-title {
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 20px;
    background: linear-gradient(45deg, #fff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: slideUp 1s ease-out;
}

.hero-subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    animation: slideUp 1s ease-out 0.3s both;
}

.section-content {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 60px;
    border-radius: 24px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    margin-bottom: 40px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
    overflow: hidden;
}

.section-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}

.section-content h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: #1f2937;
    text-align: center;
    position: relative;
}

.section-content h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 2px;
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}

.skill-tag {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.skill-tag::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
}

.skill-tag:hover::before {
    left: 100%;
}

.skill-tag:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.project-card {
    background: linear-gradient(135deg, #f8fafc, #e2e8f0);
    padding: 30px;
    border-radius: 20px;
    border: 1px solid rgba(226, 232, 240, 0.5);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea, #764ba2);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
}

.project-card:hover::before {
    opacity: 0.1;
}

.project-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.project-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #1f2937;
    position: relative;
    z-index: 2;
}

.project-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
}

.project-link:hover {
    color: #764ba2;
    transform: translateX(5px);
}

.contact-info {
    text-align: center;
}

.contact-info a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}

.contact-info a:hover {
    color: #764ba2;
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@media (max-width: 768px) {
    .hero-title { font-size: 2.5rem; }
    .hero-subtitle { font-size: 1.1rem; }
    .section-content { padding: 40px 20px; }
    .section-content h2 { font-size: 2rem; }
}`
  }
}

export default function Builder() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    name: '',
    about: '',
    skills: '',
    projects: [{ id: '1', title: '', link: '' }],
    contact: '',
    template: 1
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const addProject = () => {
    const newId = (portfolioData.projects.length + 1).toString()
    setPortfolioData({
      ...portfolioData,
      projects: [...portfolioData.projects, { id: newId, title: '', link: '' }]
    })
  }

  const removeProject = (id: string) => {
    if (portfolioData.projects.length > 1) {
      setPortfolioData({
        ...portfolioData,
        projects: portfolioData.projects.filter(project => project.id !== id)
      })
    }
  }

  const updateProject = (id: string, field: 'title' | 'link', value: string) => {
    setPortfolioData({
      ...portfolioData,
      projects: portfolioData.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    })
  }

  const handleDownload = async () => {
    try {
      const JSZip = (await import('jszip')).default
      const { saveAs } = await import('file-saver')
      
      const zip = new JSZip()
      
      // Generate HTML content based on selected template
      const htmlContent = generateHTML(portfolioData)
      const cssContent = generateCSS(portfolioData.template)
      
      zip.file('index.html', htmlContent)
      zip.file('style.css', cssContent)
      
      const blob = await zip.generateAsync({ type: 'blob' })
      saveAs(blob, `${portfolioData.name.replace(/\s+/g, '-')}-portfolio.zip`)
    } catch (error) {
      console.error('Error generating portfolio:', error)
      alert('Error generating portfolio. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Portfolio Builder</h1>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">Welcome, {user.username}!</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="btn-secondary"
              >
                Home
              </button>
              <button
                onClick={logout}
                className="btn-secondary flex items-center space-x-2"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Build Your Portfolio
            </h1>
            <p className="text-gray-600">
              Fill out the form below and see your portfolio come to life in real-time
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={portfolioData.name}
                      onChange={(e) => setPortfolioData({ ...portfolioData, name: e.target.value })}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      About Me
                    </label>
                    <textarea
                      value={portfolioData.about}
                      onChange={(e) => setPortfolioData({ ...portfolioData, about: e.target.value })}
                      className="input-field"
                      rows={4}
                      placeholder="Tell us about yourself, your passion, and what drives you..."
                    />
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Skills
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={portfolioData.skills}
                    onChange={(e) => setPortfolioData({ ...portfolioData, skills: e.target.value })}
                    className="input-field"
                    placeholder="React, Node.js, Python, UI/UX Design"
                  />
                </div>
              </div>

              <div className="card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Projects
                  </h2>
                  <button
                    onClick={addProject}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    <FiPlus className="w-4 h-4 mr-2" />
                    Add Project
                  </button>
                </div>
                
                <div className="space-y-4">
                  {portfolioData.projects.map((project, index) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Project {index + 1}
                        </span>
                        {portfolioData.projects.length > 1 && (
                          <button
                            onClick={() => removeProject(project.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                          className="input-field"
                          placeholder="Project Title"
                        />
                        <input
                          type="url"
                          value={project.link}
                          onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                          className="input-field"
                          placeholder="Project URL (optional)"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={portfolioData.contact}
                    onChange={(e) => setPortfolioData({ ...portfolioData, contact: e.target.value })}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Template Selection
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPortfolioData({ ...portfolioData, template: 1 })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      portfolioData.template === 1
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-2"></div>
                      <span className="text-sm font-medium">Template 1</span>
                      <p className="text-xs text-gray-500">Modern & Clean</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setPortfolioData({ ...portfolioData, template: 2 })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      portfolioData.template === 2
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mx-auto mb-2"></div>
                      <span className="text-sm font-medium">Template 2</span>
                      <p className="text-xs text-gray-500">Creative & Dynamic</p>
                    </div>
                  </button>
                </div>
              </div>

              <button
                onClick={handleDownload}
                disabled={!portfolioData.name || !portfolioData.about}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiDownload className="w-5 h-5 mr-2 inline" />
                Download Portfolio
              </button>
            </div>

            {/* Right Column - Preview */}
            <div className="sticky top-8">
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Live Preview
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FiEye className="w-4 h-4" />
                    <span>Real-time</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <PortfolioPreview data={portfolioData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
