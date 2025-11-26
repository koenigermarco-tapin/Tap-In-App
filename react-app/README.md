# THE GYM - React App

A modern React application for THE GYM leadership development platform.

## Features

- 🔐 **User Authentication** - Email/password and magic link authentication via Supabase
- 🥋 **Belt System** - Progress through White → Blue → Purple → Brown → Black belts
- 📊 **Assessments** - Various leadership and personal development assessments
- 🎮 **Gamification** - XP system, streaks, badges, and progress tracking
- 🛠️ **Open Mat Tools** - Practical exercises like box breathing, energy audits, etc.
- 👥 **Team Features** - Create and join teams, share assessments

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **React Router v6** for navigation
- **TanStack Query** for data fetching
- **Supabase** for authentication and database
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase project (for authentication)

### Installation

1. Clone the repository and navigate to the react-app folder:
   \`\`\`bash
   cd react-app
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Update `.env` with your Supabase credentials:
   \`\`\`
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Building for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist` folder.

## Project Structure

\`\`\`
src/
├── components/          # Reusable components
│   ├── assessments/    # Assessment-related components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Navigation, Layout)
│   └── ui/             # UI primitives (Button, Card, Input)
├── contexts/           # React contexts (AuthContext)
├── hooks/              # Custom hooks
├── lib/                # Utilities and Supabase client
├── pages/              # Page components
│   └── assessments/    # Individual assessment pages
├── styles/             # Global styles
└── types/              # TypeScript type definitions
\`\`\`

## Authentication

The app supports two authentication methods:

1. **Password Authentication** - Traditional email/password login
2. **Magic Link** - Passwordless email authentication

Users can sign up for a new account or sign in to an existing one. Protected routes require authentication.

## Supabase Setup

Make sure your Supabase project has the following tables:

- `user_profiles` - User profile data
- `teams` - Team information
- `team_members` - Team membership
- `assessments` - Assessment results

See the main project's `supabase-setup.sql` for the complete schema.

## Deployment

This app is configured for Netlify deployment:

1. Connect your repository to Netlify
2. Set the build command: `npm run build`
3. Set the publish directory: `dist`
4. Add environment variables in Netlify dashboard

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
