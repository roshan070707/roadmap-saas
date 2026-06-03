# ROADMAP

**The deterministic engine for career acceleration. Stop guessing. Start executing.**

## Overview

ROADMAP is a professional SaaS platform designed to guide developers, engineers, and tech enthusiasts along structured, AI-generated career paths. By leveraging the `@convex-dev/auth` for secure access and a highly scalable serverless backend via Convex, ROADMAP provides users with deterministic learning steps, community integrations, study analytics, and team collaboration features.

## Features

- **AI-Powered Roadmaps:** Generate custom skill trees for any tech role (e.g., Full Stack, AI Engineer).
- **Study Dashboard & Analytics:** Track study hours, streaks, and learning health scores.
- **Interactive Verification:** Prove your learning through GitHub repositories and study notes.
- **Team Workspaces (Pro/Team):** Collaborate with peers, track shared goals, and manage members.
- **PDF Exports:** Export your roadmaps to share with mentors and recruiters.
- **Premium Tiers:** Free, Pro, and Team tiers unlocking advanced features.
- **Command Palette:** Quick navigation and actions anywhere in the platform (`Ctrl + K`).

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite, Framer Motion
- **Routing:** React Router DOM v7
- **Backend & Database:** Convex (Serverless, Real-time)
- **Authentication:** Convex Auth (Email, GitHub, Google OAuth)
- **Icons:** Lucide React
- **Exporting:** jsPDF, html2canvas

## Architecture

1. **Client Layer:** A responsive, dark-theme optimized UI built with `glass-card` aesthetics.
2. **Business Layer:** Manages subscriptions, waitlists, team invites, and user settings via specialized Convex tables.
3. **Data Layer:** Real-time synchronization for study sessions, roadmap progress, and community interactions.

## Installation

```bash
# Clone the repository
git clone https://github.com/roshan070707/roadmap-saas.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Deployment

To deploy the frontend to Vercel/Netlify and the backend to Convex Production:
```bash
npx convex deploy
npm run build
```

## Screenshots
*(Add screenshots here)*

## Future Plans

- Full AI Mentor integration for real-time code reviews.
- Resume Analyzer & Interview Simulator.
- Complete Light Theme.
- B2B Team Leaderboards.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Built by Roshan Manjani**
- [GitHub](https://github.com/roshan070707)
- [LinkedIn](https://linkedin.com/in/roshanmanjani)
