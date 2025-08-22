# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

### 3. Get Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
6. Copy Client ID and Client Secret to your `.env.local` file

### 4. Run Development Server
```bash
npm run dev
```

### 5. Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 What You'll See

- **Landing Page**: Beautiful hero section with Google sign-in
- **Builder Page**: Form to create your portfolio with live preview
- **Two Templates**: Choose between modern/clean or creative/dynamic
- **Live Preview**: See changes in real-time as you type
- **Download**: Generate and download your portfolio as a ZIP file

## 🔧 Development Tips

- **Hot Reload**: Changes reflect immediately in the browser
- **TypeScript**: Full type safety with IntelliSense
- **Tailwind**: Utility-first CSS with custom animations
- **Responsive**: Mobile-first design approach

## 📱 Test Responsiveness

- Use browser dev tools to test mobile views
- Test on different screen sizes
- Check animations and interactions

## 🚀 Ready to Deploy?

- Push to GitHub
- Connect to Vercel
- Add production environment variables
- Deploy automatically!

---

**Happy Coding! 🎉**
