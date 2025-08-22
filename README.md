# Portfolio Builder SaaS

A modern, feature-rich portfolio builder that allows users to create and download beautiful portfolios as static websites. Built with Next.js, Tailwind CSS, and NextAuth.js.

## ✨ Features

- **Google OAuth Authentication** - Secure sign-in with Google accounts
- **Live Preview** - Real-time preview as you build your portfolio
- **Multiple Templates** - Choose from 2 beautifully designed templates
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Instant Download** - Generate and download portfolios as ZIP files
- **No Database Required** - Simple SaaS without backend complexity

## 🎨 Templates

### Template 1: Modern & Clean
- Clean, professional design
- Blue gradient theme
- Smooth fade-in animations
- Perfect for corporate portfolios

### Template 2: Creative & Dynamic
- Vibrant, creative design
- Purple-pink gradient theme
- Advanced animations (floating, shimmer, glow effects)
- Great for creative professionals

## 🚀 Tech Stack

- **Frontend**: Next.js 13 (Pages Router)
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **ZIP Generation**: JSZip + FileSaver
- **Icons**: React Icons
- **TypeScript**: Full type safety
- **Deployment**: Vercel ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-builder-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production
   
   GOOGLE_CLIENT_ID=your-google-client-id-here
   GOOGLE_CLIENT_SECRET=your-google-client-secret-here
   ```

4. **Set up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to Credentials → Create Credentials → OAuth 2.0 Client ID
   - Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
   - Copy Client ID and Client Secret to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Google OAuth Setup
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`

### Environment Variables
- `NEXTAUTH_URL`: Your application URL
- `NEXTAUTH_SECRET`: Random string for JWT encryption
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## 📱 Usage

### For Users
1. **Sign In**: Click "Sign in with Google" on the landing page
2. **Build Portfolio**: Fill out the form with your information:
   - Personal details (name, about me)
   - Skills (comma-separated)
   - Projects (title + optional link)
   - Contact information (email)
3. **Choose Template**: Select from 2 available templates
4. **Preview**: See your portfolio update in real-time
5. **Download**: Click download to get your portfolio as a ZIP file

### For Developers
- **Adding Templates**: Create new template functions in `pages/builder.tsx`
- **Styling**: Modify `styles/globals.css` and Tailwind config
- **Components**: Extend components in the `components/` directory

## 🎯 Project Structure

```
portfolio-builder-saas/
├── components/           # React components
│   ├── Layout.tsx       # Main layout with navigation
│   └── PortfolioPreview.tsx # Live preview component
├── pages/               # Next.js pages
│   ├── api/            # API routes
│   │   └── auth/       # NextAuth configuration
│   ├── _app.tsx        # App wrapper with providers
│   ├── index.tsx       # Landing page
│   └── builder.tsx     # Portfolio builder page
├── styles/              # Global styles
│   └── globals.css     # Tailwind + custom CSS
├── types/               # TypeScript type definitions
│   └── portfolio.ts    # Portfolio data types
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
- **Animations**: Add new keyframes in `tailwind.config.js`
- **Layout**: Update component structure and Tailwind classes

## 🔒 Security Features

- **OAuth 2.0**: Secure Google authentication
- **Protected Routes**: Builder page only accessible to authenticated users
- **Input Validation**: Form validation and sanitization
- **CORS Protection**: Built-in Next.js security

## 📊 Performance

- **Static Generation**: Optimized for fast loading
- **Lazy Loading**: Dynamic imports for heavy libraries
- **Image Optimization**: Next.js automatic image optimization
- **CSS Purge**: Tailwind CSS purging for production

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

1. Check the [Issues](https://github.com/yourusername/portfolio-builder-saas/issues) page
2. Create a new issue with detailed description
3. Include your environment details and error logs

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first CSS framework
- NextAuth.js for authentication
- JSZip and FileSaver for ZIP generation

---

**Happy Portfolio Building! 🚀**
