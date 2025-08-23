import React, { useState } from 'react'
import Layout from '../components/Layout'
import { PortfolioData } from '../lib/supabase'
import { exportPortfolio } from '../lib/portfolioExport'

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    user_id: 'demo-user',
    personal_info: {
      name: 'John Doe',
      title: 'Full Stack Developer',
      bio: 'Passionate developer with expertise in modern web technologies.',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe'
    },
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    projects: [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce solution built with React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'https://example.com',
        github: 'https://github.com/johndoe/ecommerce'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Stanford University',
        year: '2020',
        description: 'Graduated with honors'
      }
    ],
    experience: [
      {
        id: '1',
        title: 'Senior Developer',
        company: 'Tech Corp',
        period: '2021 - Present',
        description: 'Leading development of web applications and mentoring junior developers.'
      }
    ]
  })

  const handleExport = () => {
    exportPortfolio(portfolio)
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Portfolio Builder Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          This is a demo version. In the full version, you would be able to edit all sections.
        </p>
        <button
          onClick={handleExport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
        >
          Download Portfolio as ZIP
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Portfolio Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Preview</h2>
          <div className="space-y-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {portfolio.personal_info.name}
              </h3>
              <p className="text-gray-600 mb-2">{portfolio.personal_info.title}</p>
              <p className="text-gray-700">{portfolio.personal_info.bio}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Edit Personal Info</h4>
              <p className="text-sm text-gray-600 mb-3">Update your name, title, and bio</p>
              <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm">
                Coming Soon
              </button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Add Projects</h4>
              <p className="text-sm text-gray-600 mb-3">Showcase your work and achievements</p>
              <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm">
                Coming Soon
              </button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Customize Design</h4>
              <p className="text-sm text-gray-600 mb-3">Choose from multiple templates</p>
              <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
