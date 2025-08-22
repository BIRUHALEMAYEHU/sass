import { Project } from '../types/portfolio'

interface PortfolioPreviewProps {
  data: {
    name: string
    about: string
    skills: string
    projects: Project[]
    contact: string
    template: number
  }
}

export default function PortfolioPreview({ data }: PortfolioPreviewProps) {
  const skillsList = data.skills.split(',').map(skill => skill.trim()).filter(Boolean)
  const projectsList = data.projects.filter(project => project.title.trim())

  if (data.template === 1) {
    return (
      <div className="template-1 bg-white min-h-[600px] overflow-y-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 fade-in">
            {data.name || 'Your Name'}
          </h1>
          <p className="text-lg opacity-90 fade-in" style={{ animationDelay: '0.3s' }}>
            {data.about || 'Tell us about yourself, your passion, and what drives you...'}
          </p>
        </div>

        {/* Skills Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {skillsList.length > 0 ? (
              skillsList.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500 italic">Add your skills (comma-separated)</span>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Featured Projects</h2>
          <div className="space-y-4">
            {projectsList.length > 0 ? (
              projectsList.map((project, index) => (
                <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 italic">
                Add your projects to showcase your work
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Get In Touch</h2>
          <div className="text-center">
            {data.contact ? (
              <p className="text-gray-600">
                📧 <a href={`mailto:${data.contact}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  {data.contact}
                </a>
              </p>
            ) : (
              <p className="text-gray-500 italic">Add your email address</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Template 2: Creative & Dynamic
  return (
    <div className="template-2 bg-gradient-to-br from-purple-50 to-pink-50 min-h-[600px] overflow-y-auto">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white p-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-4 slide-up">
            {data.name || 'Your Name'}
          </h1>
          <p className="text-lg opacity-90 slide-up" style={{ animationDelay: '0.3s' }}>
            {data.about || 'Tell us about yourself, your passion, and what drives you...'}
          </p>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-white opacity-20 rounded-full float"></div>
        <div className="absolute top-8 right-6 w-6 h-6 bg-white opacity-20 rounded-full float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-6 left-8 w-4 h-4 bg-white opacity-20 rounded-full float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Skills Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center relative">
          Skills & Expertise
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {skillsList.length > 0 ? (
            skillsList.map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-500 italic">Add your skills (comma-separated)</span>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <div className="p-6 bg-white bg-opacity-50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center relative">
          Featured Projects
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
        </h2>
        <div className="space-y-4">
          {projectsList.length > 0 ? (
            projectsList.map((project, index) => (
              <div 
                key={project.id} 
                className="bg-white p-4 rounded-xl shadow-md border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="font-semibold text-gray-800 mb-2">{project.title}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors duration-300"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 italic">
              Add your projects to showcase your work
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center relative">
          Get In Touch
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
        </h2>
        <div className="text-center">
          {data.contact ? (
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-2xl">📧</span>
              <a 
                href={`mailto:${data.contact}`} 
                className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
              >
                {data.contact}
              </a>
            </div>
          ) : (
            <p className="text-gray-500 italic">Add your email address</p>
          )}
        </div>
      </div>
    </div>
  )
}
