# Nexmail - Next Generation Email Management

<div align="center">

![Nexmail Logo](public/favicon.ico)

**AI-Powered Email Management Platform**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.48.1-green.svg)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-38bdf8.svg)](https://tailwindcss.com/)

</div>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Development](#development)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

Nexmail is a modern, AI-powered email management platform designed to revolutionize how you handle your emails. Built with cutting-edge technologies, Nexmail offers intelligent email summarization, automated responses, and smart categorization to help you stay organized and efficient.

### Key Highlights

- ✨ **AI-Driven Summarization**: Get instant summaries of your emails
- 🤖 **Automated Responses**: Smart AI-generated email responses
- 📊 **Analytics Dashboard**: Track your email patterns and productivity
- 🎨 **Modern UI**: Beautiful, responsive design with dark mode support
- 🔒 **Secure**: Built with Supabase for secure authentication and data management

## ✨ Features

### Core Features

- **Email Management**
  - Intelligent email categorization
  - Smart search functionality
  - Calendar integration
  - Priority notifications

- **AI Capabilities**
  - Email summarization
  - Automated response generation
  - Pattern analysis
  - Smart suggestions

- **User Experience**
  - Responsive design (mobile, tablet, desktop)
  - Dark mode support
  - Smooth animations and transitions
  - Intuitive navigation

- **Subscription Plans**
  - Free tier with basic features
  - Professional plan with advanced features
  - Enterprise plan with unlimited access

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

### Backend & Services

- **Supabase** - Backend as a Service (BaaS)
  - Authentication
  - Database (PostgreSQL)
  - Real-time subscriptions
  - Row Level Security (RLS)

### State Management & Data Fetching

- **TanStack Query (React Query) 5.56.2** - Server state management
- **React Hook Form 7.53.0** - Form handling
- **Zod 3.23.8** - Schema validation

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
- **Supabase Account** - [Sign up](https://supabase.com/)

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

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Or create a new `.env` file with the following variables:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## ⚙️ Configuration

### Supabase Setup

1. **Create a Supabase Project**
   - Go to [Supabase Dashboard](https://app.supabase.com/)
   - Create a new project
   - Note your project URL and anon key

2. **Update Supabase Configuration**

   Edit `src/lib/supabase.ts`:

   ```typescript
   const supabaseUrl = 'https://your-project-url.supabase.co';
   const supabaseKey = 'your-anon-key';
   ```

   Or use environment variables:

   ```typescript
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
   ```

3. **Run Database Migrations**

   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the migration file: `supabase/migrations/create_tables.sql`

## 📖 Usage

### Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

Create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

## 💻 Development

### Project Structure

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
│   │   ├── supabase.ts   # Supabase client
│   │   └── utils.ts      # Helper functions
│   ├── pages/             # Page components
│   │   ├── Index.tsx     # Home page
│   │   └── NotFound.tsx  # 404 page
│   ├── types/             # TypeScript type definitions
│   │   └── plan.ts       # Plan types
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── supabase/
│   └── migrations/        # Database migrations
│       └── create_tables.sql
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
- **`src/pages/Index.tsx`** - Home page with features and pricing
- **`src/lib/supabase.ts`** - Supabase client configuration
- **`vite.config.ts`** - Vite build configuration
- **`tailwind.config.ts`** - Tailwind CSS theme and utilities

### Adding New Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for components. To add a new component:

```bash
npx shadcn-ui@latest add [component-name]
```

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Follow React best practices
- Maintain consistent code formatting

## 🗄 Database Setup

### Tables

The application uses the following Supabase tables:

1. **`user_plans`**
   - Stores user subscription plans
   - Fields: `id`, `user_id`, `plan_type`, `created_at`, `updated_at`

2. **`usage_history`**
   - Tracks user actions and usage
   - Fields: `id`, `user_id`, `action`, `details`, `created_at`

### Row Level Security (RLS)

All tables have RLS enabled with policies:
- Users can only view/insert their own data
- Secure by default

### Running Migrations

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `supabase/migrations/create_tables.sql`
4. Execute the SQL

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com/)
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import your repository in [Netlify](https://www.netlify.com/)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy!

### Other Platforms

The built `dist` folder can be deployed to any static hosting service:
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps
- Google Cloud Storage

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write clear commit messages
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **2nd CSM Students** - Initial work

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for the amazing backend platform
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

For support, email support@nexmail.com or open an issue in the GitHub repository.

## 🔗 Links

- [GitHub Repository](https://github.com/Keerthanreddy01/Sprint2Fazed)
- [Documentation](#)
- [Issue Tracker](https://github.com/Keerthanreddy01/Sprint2Fazed/issues)

---

<div align="center">

Made with ❤️ by 2nd CSM Students

⭐ Star this repo if you find it helpful!

</div>
