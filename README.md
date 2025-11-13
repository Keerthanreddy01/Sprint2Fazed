# Nexmail - Next Generation Email Management

<div align="center">

![Nexmail Logo](public/favicon.ico)

**AI-Powered Email Management Platform with Spam Detection**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-38bdf8.svg)](https://tailwindcss.com/)

[Live Demo](https://sprint2fazed.vercel.app) • [Report Bug](https://github.com/Keerthanreddy01/Sprint2Fazed/issues) • [Request Feature](https://github.com/Keerthanreddy01/Sprint2Fazed/issues)

</div>

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Spam Detection](#-spam-detection)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 About

Nexmail is a modern, AI-powered email management platform designed to revolutionize how you handle your emails. Built with cutting-edge technologies, Nexmail offers intelligent email summarization, automated spam detection, and smart categorization to help you stay organized and efficient.

### Key Highlights

- ✨ **AI-Driven Summarization**: Get instant summaries of your emails
- 🛡️ **Advanced Spam Detection**: Real-time spam detection with detailed scoring
- 📊 **Email Management**: Organize emails with categories and search
- 🎨 **Modern UI**: Beautiful, responsive design with dark mode support
- 🔒 **Privacy-First**: All data stored locally in your browser (localStorage)
- ⚡ **No Backend Required**: Works completely offline

## ✨ Features

### Core Features

- **Email Management**
  - Intelligent email categorization (Inbox, Spam, Sent, Drafts)
  - Smart search functionality
  - Mark as read/unread
  - Star/unstar emails
  - Delete emails
  - Email detail view

- **Spam Detection**
  - Real-time spam detection algorithm
  - Spam score calculation (0-100)
  - Detailed detection reasons
  - Pre-send spam warnings
  - Automatic spam flagging

- **AI Capabilities**
  - Email summarization
  - Pattern analysis
  - Smart suggestions

- **User Experience**
  - Simple email-based authentication (no password required)
  - Responsive design (mobile, tablet, desktop)
  - Dark mode support
  - Smooth animations and transitions
  - Intuitive navigation
  - Toast notifications

## 🛠 Tech Stack

### Frontend

- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety
- **Vite 5.4.1** - Build tool and dev server
- **React Router 6.26.2** - Client-side routing
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### State Management & Data Fetching

- **TanStack Query (React Query) 5.56.2** - Server state management
- **React Hook Form 7.53.0** - Form handling
- **Zod 3.23.8** - Schema validation

### Data Storage

- **localStorage** - Client-side data persistence
- No backend required
- Works completely offline

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** - Package manager
- **Git** - Version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Keerthanreddy01/Sprint2Fazed.git
cd Sprint2Fazed
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using pnpm:
```bash
pnpm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 📖 Usage

### Getting Started

1. **Sign Up**: Click "Get Started" and enter your email address
2. **Login**: Enter your email to access your dashboard
3. **View Emails**: Browse your inbox with sample emails pre-loaded
4. **Compose**: Click "Compose" to send new emails
5. **Spam Detection**: System automatically detects spam emails

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 💻 Project Structure

```
nexmail-zenith-main/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── components/         # React components
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   │   ├── spamDetection.ts  # Spam detection engine
│   │   └── utils.ts      # Helper functions
│   ├── pages/             # Page components
│   │   ├── Index.tsx     # Landing page
│   │   ├── Login.tsx     # Login page
│   │   ├── Signup.tsx    # Signup page
│   │   ├── Dashboard.tsx # Email inbox
│   │   ├── EmailDetail.tsx # Email detail view
│   │   ├── Compose.tsx    # Compose email
│   │   └── NotFound.tsx  # 404 page
│   ├── types/             # TypeScript type definitions
│   │   ├── email.ts       # Email types
│   │   └── plan.ts       # Plan types
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── .gitignore            # Git ignore rules
├── components.json        # shadcn/ui configuration
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

### Key Files

- **`src/App.tsx`** - Main application component with routing
- **`src/pages/Dashboard.tsx`** - Email inbox with spam detection
- **`src/lib/spamDetection.ts`** - Spam detection algorithm
- **`src/pages/Compose.tsx`** - Email composition with spam check
- **`vite.config.ts`** - Vite build configuration
- **`tailwind.config.ts`** - Tailwind CSS theme and utilities

## 🛡️ Spam Detection

### How It Works

The spam detection system uses multiple heuristics to identify spam emails:

1. **Keyword Detection**: Checks for common spam keywords
2. **Pattern Recognition**: Identifies suspicious patterns (excessive caps, punctuation)
3. **URL Analysis**: Counts and analyzes URLs in emails
4. **Sender Validation**: Validates email format and sender patterns
5. **Phrase Detection**: Identifies common spam phrases

### Spam Score

- **Score Range**: 0-100
- **Threshold**: ≥70 = Spam
- **Display**: Shows score and detailed reasons

### Example

```typescript
// Spam detection automatically runs on:
// - Incoming emails
// - Composed emails (before sending)
// - Email detail view
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com/)
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

### Netlify

1. Push your code to GitHub
2. Import your repository in [Netlify](https://www.netlify.com/)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

### GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Other Platforms

The built `dist` folder can be deployed to any static hosting service:
- AWS S3 + CloudFront
- Azure Static Web Apps
- Google Cloud Storage
- Cloudflare Pages

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write clear commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed
- Ensure TypeScript types are correct
- Run `npm run lint` before committing

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety
- Maintain consistent code formatting

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **2nd CSM Students** - Initial work

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the amazing UI library

## 📞 Support

For support, open an issue in the [GitHub repository](https://github.com/Keerthanreddy01/Sprint2Fazed/issues).

## 🔗 Links

- [GitHub Repository](https://github.com/Keerthanreddy01/Sprint2Fazed)
- [Live Demo](https://sprint2fazed.vercel.app)
- [Issue Tracker](https://github.com/Keerthanreddy01/Sprint2Fazed/issues)

---

<div align="center">

Made with ❤️ by 2nd CSM Students

⭐ Star this repo if you find it helpful!

</div>
