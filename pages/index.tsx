import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'
import { FiArrowRight, FiStar, FiDownload, FiImage, FiUser } from 'react-icons/fi'

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    if (user) {
      router.push('/builder')
    } else {
      router.push('/auth')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-gray-900">Portfolio Builder</div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.username}!</span>
              <button
                onClick={() => router.push('/builder')}
                className="btn-secondary"
              >
                Go to Builder
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              className="btn-secondary"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto px-4">
          {/* Floating elements for visual appeal */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-20 h-20 bg-blue-200 rounded-full opacity-20"></div>
          </div>
          <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-16 h-16 bg-indigo-200 rounded-full opacity-20"></div>
          </div>
          <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
            <div className="w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
          </div>

          {/* Main content */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
              Create Your Professional Portfolio
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Build and download a beautiful portfolio in minutes. Choose from stunning templates and showcase your skills with style.
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiImage className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Beautiful Templates</h3>
                <p className="text-gray-600">Choose from multiple professional designs</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiStar className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Easy Customization</h3>
                <p className="text-gray-600">Fill forms and see live preview</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiDownload className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Download</h3>
                <p className="text-gray-600">Get your portfolio as a ZIP file</p>
              </div>
            </div>

            {/* Get Started button */}
            <button
              onClick={handleGetStarted}
              className="btn-primary text-lg px-8 py-4 animate-fade-in group"
              style={{ animationDelay: '0.9s' }}
            >
              <span className="flex items-center space-x-3">
                <FiUser className="w-6 h-6" />
                <span>{user ? 'Continue Building' : 'Get Started'}</span>
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <p className="text-sm text-gray-500 mt-4 animate-fade-in" style={{ animationDelay: '1.2s' }}>
              Free to use • No credit card required • Instant access
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
