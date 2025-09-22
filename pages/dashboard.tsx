import React, { useState } from 'react'
import Layout from '../components/Layout'
import { PortfolioData } from '../lib/supabase'
import { exportPortfolio } from '../lib/portfolioExport'

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    user_id: 'demo-user',
    personal_info: {
      name: '',
      title: '',
      bio: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: ''
    },
    skills: [],
    projects: [],
    education: [],
    experience: []
  })

  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [newSkill, setNewSkill] = useState('')
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
    github: ''
  })
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    description: ''
  })
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    period: '',
    description: ''
  })

  const handleExport = () => {
    exportPortfolio(portfolio, selectedTemplate)
  }

  const updatePersonalInfo = (field: string, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      personal_info: {
        ...prev.personal_info,
        [field]: value
      }
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !portfolio.skills.includes(newSkill.trim())) {
      setPortfolio(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setPortfolio(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const addProject = () => {
    if (newProject.title.trim()) {
      const project = {
        id: Date.now().toString(),
        title: newProject.title.trim(),
        description: newProject.description.trim(),
        technologies: newProject.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        link: newProject.link.trim() || undefined,
        github: newProject.github.trim() || undefined
      }
      setPortfolio(prev => ({
        ...prev,
        projects: [...prev.projects, project]
      }))
      setNewProject({ title: '', description: '', technologies: '', link: '', github: '' })
    }
  }

  const removeProject = (projectId: string) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== projectId)
    }))
  }

  const addEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim()) {
      const education = {
        id: Date.now().toString(),
        degree: newEducation.degree.trim(),
        institution: newEducation.institution.trim(),
        year: newEducation.year.trim(),
        description: newEducation.description.trim() || undefined
      }
      setPortfolio(prev => ({
        ...prev,
        education: [...prev.education, education]
      }))
      setNewEducation({ degree: '', institution: '', year: '', description: '' })
    }
  }

  const removeEducation = (educationId: string) => {
    setPortfolio(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== educationId)
    }))
  }

  const addExperience = () => {
    if (newExperience.title.trim() && newExperience.company.trim()) {
      const experience = {
        id: Date.now().toString(),
        title: newExperience.title.trim(),
        company: newExperience.company.trim(),
        period: newExperience.period.trim(),
        description: newExperience.description.trim()
      }
      setPortfolio(prev => ({
        ...prev,
        experience: [...prev.experience, experience]
      }))
      setNewExperience({ title: '', company: '', period: '', description: '' })
    }
  }

  const removeExperience = (experienceId: string) => {
    setPortfolio(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== experienceId)
    }))
  }

  return (
    <Layout title="Dashboard - Portfolio Builder">
      {/* Demo Mode Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Demo Mode
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                You're in demo mode. All changes are temporary and won't be saved to a database. 
                To enable full functionality, configure Supabase environment variables.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Portfolio Builder
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create your professional portfolio in one go
        </p>
        
        {/* Template Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Style</h3>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => setSelectedTemplate('modern')}
              className={`px-8 py-4 rounded-xl border-2 transition-all duration-300 ${
                selectedTemplate === 'modern'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg transform scale-105'
                  : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🎨</div>
                <div className="font-semibold">Modern</div>
                <div className="text-sm text-gray-500">Creative & Contemporary</div>
              </div>
            </button>
            <button
              onClick={() => setSelectedTemplate('classic')}
              className={`px-8 py-4 rounded-xl border-2 transition-all duration-300 ${
                selectedTemplate === 'classic'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg transform scale-105'
                  : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">💼</div>
                <div className="font-semibold">Classic</div>
                <div className="text-sm text-gray-500">Professional & Elegant</div>
              </div>
            </button>
          </div>
        </div>

        <button
          onClick={() => exportPortfolio(portfolio, selectedTemplate)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          🚀 Download Your Portfolio
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Single Comprehensive Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Build Your Portfolio</h2>
            <p className="text-gray-600">Fill out all sections below to create your perfect portfolio</p>
          </div>

          <form className="space-y-8">
            {/* Personal Information Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={portfolio.personal_info.name}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={portfolio.personal_info.title}
                    onChange={(e) => updatePersonalInfo('title', e.target.value)}
                    placeholder="e.g., Software Developer, Designer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio/About Me <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={portfolio.personal_info.bio}
                  onChange={(e) => updatePersonalInfo('bio', e.target.value)}
                  rows={3}
                  placeholder="Write a brief description about yourself, your skills, and what you do..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
            </div>
            
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={portfolio.personal_info.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={portfolio.personal_info.phone || ''}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={portfolio.personal_info.location || ''}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    placeholder="City, Country"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
            <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={portfolio.personal_info.linkedin || ''}
                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/yourname"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                  <input
                    type="url"
                    value={portfolio.personal_info.github || ''}
                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                Skills & Expertise
              </h3>
              
              <div className="flex space-x-3 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., JavaScript, React, Python, Adobe Photoshop..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add
                </button>
              </div>
              
              {portfolio.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-green-200 hover:shadow-md transition-all duration-200"
                    >
                    {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                  </span>
                ))}
              </div>
              )}
            </div>

            {/* Projects Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                Projects & Portfolio
              </h3>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., E-commerce Website"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
            </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
                    <input
                      type="text"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject(prev => ({ ...prev, technologies: e.target.value }))}
                      placeholder="React, Node.js, MongoDB (comma-separated)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
          </div>
        </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    placeholder="Describe what the project does, its key features, and your role..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                    <input
                      type="url"
                      value={newProject.link}
                      onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
                      placeholder="https://yourproject.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Repository</label>
                    <input
                      type="url"
                      value={newProject.github}
                      onChange={(e) => setNewProject(prev => ({ ...prev, github: e.target.value }))}
                      placeholder="https://github.com/username/project"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addProject}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Project
                </button>
              </div>

              {portfolio.projects.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900">Your Projects ({portfolio.projects.length})</h4>
                  {portfolio.projects.map((project) => (
                    <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 text-lg">{project.title}</h5>
                          <p className="text-gray-600 mt-1">{project.description}</p>
                          {project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {project.technologies.map((tech, index) => (
                                <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeProject(project.id)}
                          className="text-gray-400 hover:text-red-600 ml-4 p-1 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                Work Experience
              </h3>
              
          <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newExperience.title}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Senior Developer"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="e.g., Tech Corp"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                  <input
                    type="text"
                    value={newExperience.period}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, period: e.target.value }))}
                    placeholder="2021 - Present"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newExperience.description}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    placeholder="Describe your responsibilities and achievements..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={addExperience}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Experience
              </button>
            </div>
            
              {portfolio.experience.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900">Your Experience ({portfolio.experience.length})</h4>
                  {portfolio.experience.map((exp) => (
                    <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 text-lg">{exp.title}</h5>
                          <p className="text-orange-600 font-medium">{exp.company}</p>
                          <p className="text-gray-500 text-sm">{exp.period}</p>
                          <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          className="text-gray-400 hover:text-red-600 ml-4 p-1 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                Education
              </h3>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                      placeholder="e.g., Bachelor of Science in Computer Science"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                      placeholder="e.g., Stanford University"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="text"
                    value={newEducation.year}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="2020"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    value={newEducation.description}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                    placeholder="e.g., Graduated with honors, GPA 3.8"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={addEducation}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Education
              </button>
            </div>
            
              {portfolio.education.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900">Your Education ({portfolio.education.length})</h4>
                  {portfolio.education.map((edu) => (
                    <div key={edu.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 text-lg">{edu.degree}</h5>
                          <p className="text-indigo-600 font-medium">{edu.institution}</p>
                          <p className="text-gray-500 text-sm">{edu.year}</p>
                          {edu.description && <p className="text-gray-600 text-sm mt-1">{edu.description}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEducation(edu.id)}
                          className="text-gray-400 hover:text-red-600 ml-4 p-1 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
              </button>
            </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Live Preview</h2>
          <div className="space-y-6">
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {portfolio.personal_info.name ? portfolio.personal_info.name.charAt(0).toUpperCase() : '?'}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {portfolio.personal_info.name || 'Your Name'}
              </h3>
              <p className="text-lg text-gray-600 mb-3">{portfolio.personal_info.title || 'Your Title'}</p>
              <p className="text-gray-700">{portfolio.personal_info.bio || 'Your bio will appear here...'}</p>
            </div>
            
            {portfolio.skills.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.map((skill, index) => (
                    <span key={index} className="bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {portfolio.projects.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Projects</h4>
                <div className="space-y-3">
                  {portfolio.projects.map((project) => (
                    <div key={project.id} className="p-4 bg-gray-50 rounded-lg border">
                      <h5 className="font-semibold text-gray-900">{project.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {portfolio.experience.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Experience</h4>
                <div className="space-y-3">
                  {portfolio.experience.map((exp) => (
                    <div key={exp.id} className="p-4 bg-gray-50 rounded-lg border">
                      <h5 className="font-semibold text-gray-900">{exp.title}</h5>
                      <p className="text-sm text-orange-600">{exp.company}</p>
                      <p className="text-xs text-gray-500">{exp.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {portfolio.education.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Education</h4>
                <div className="space-y-3">
                  {portfolio.education.map((edu) => (
                    <div key={edu.id} className="p-4 bg-gray-50 rounded-lg border">
                      <h5 className="font-semibold text-gray-900">{edu.degree}</h5>
                      <p className="text-sm text-indigo-600">{edu.institution}</p>
                      <p className="text-xs text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
