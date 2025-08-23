# Portfolio Builder

A modern, feature-rich portfolio website builder that allows users to create and download beautiful portfolios as static websites. Built with Next.js, Tailwind CSS, and Supabase.

## ✨ Features

- **Live Preview** - Real-time preview as you build your portfolio
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Instant Download** - Generate and download portfolios as ZIP files
- **Supabase Integration** - Authentication and data storage (with demo mode)
- **TypeScript** - Full type safety
- **Export Functionality** - Create standalone HTML/CSS websites

## 🚀 Tech Stack

- **Frontend**: Next.js 13 (Pages Router)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Authentication & Database)
- **ZIP Generation**: JSZip + FileSaver
- **TypeScript**: Full type safety
- **Deployment**: Vercel ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Supabase Setup

1. Visit [Supabase](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings → API to get your project URL and anon key
4. Add them to your `.env.local` file

### Database Schema

Run this SQL in your Supabase SQL editor:

```sql
-- Create portfolios table
CREATE TABLE portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  personal_info JSONB NOT NULL,
  skills TEXT[] DEFAULT '{}',
  projects JSONB[] DEFAULT '{}',
  education JSONB[] DEFAULT '{}',
  experience JSONB[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own portfolios
CREATE POLICY "Users can manage their own portfolios" ON portfolios
  FOR ALL USING (auth.uid() = user_id);
```

## 📱 Usage

### For Users

1. **Sign In**: Click "Sign in" on the landing page
2. **Build Portfolio**: Fill out the form with your information:
   - Personal details (name, about me)
   - Skills (comma-separated)
   - Projects (title + optional link)
   - Contact information (email)
3. **Preview**: See your portfolio update in real-time
4. **Download**: Click download to get your portfolio as a ZIP file

### Demo Mode

The app works without Supabase configuration in demo mode:
- All changes are temporary
- Export functionality works
- No data persistence

## 🎯 Project Structure

```
portfolio-builder/
├── components/           # React components
│   └── Layout.tsx       # Main layout with navigation
├── lib/                  # Utility functions
│   ├── supabase.ts      # Supabase client & types
│   └── portfolioExport.ts # ZIP export functionality
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper
│   ├── index.tsx        # Landing page
│   ├── auth.tsx         # Authentication page
│   └── dashboard.tsx    # Portfolio builder page
├── styles/              # Global styles
│   └── globals.css      # Tailwind + custom CSS
├── tailwind.config.js   # Tailwind configuration
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies
└── README.md           # This file
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

- **Netlify**: Build command: `npm run build`, publish directory: `.next`
- **Railway**: Add build command and environment variables
- **Heroku**: Add Node.js buildpack and environment variables

## 🎨 Customization

### Adding New Templates

1. Add template option in the builder form
2. Create template-specific CSS in `generateCSS()` function
3. Update preview component to handle new template
4. Add template preview in selection UI

### Styling Modifications

- **Colors**: Modify Tailwind config or CSS variables
- **Layout**: Update component structure and Tailwind classes
- **Animations**: Add new keyframes in `tailwind.config.js`

## 🔒 Security Features

- **Row Level Security**: Users can only access their own data
- **Input Validation**: Form validation and sanitization
- **CORS Protection**: Built-in Next.js security

## 📊 Performance

- **Static Generation**: Optimized for fast loading
- **CSS Purge**: Tailwind CSS purging for production
- **Image Optimization**: Next.js automatic image optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the Issues page
2. Create a new issue with detailed description
3. Include your environment details and error logs

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first CSS framework
- Supabase for the backend infrastructure
- JSZip and FileSaver for ZIP generation

---

**Happy Portfolio Building! 🚀**
