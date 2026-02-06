# Finance Digest

A financial news aggregation app that displays the latest market insights and financial stories.

## Features

- **Next.js 16** - React framework with server-side rendering
- **TypeScript** - Type-safe code
- **Tailwind CSS 4** - Utility-first styling with PostCSS
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Infinite scroll** - Load more articles dynamically
- **Responsive design** - Mobile-first UI

## Quick Start

### Clone

```bash
git clone <repo-url>
cd finance-digest
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Setup

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=your_api_endpoint_here
NEXT_PUBLIC_API_KEY=your_api_key_here
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build, lint, and format
- `npm run lint` - Run ESLint
- `npm run prettier` - Format code with Prettier
- `npm start` - Start production server

## Project Structure

```
src/
├── app/          # Next.js app directory (pages, layout)
├── components/   # React components
└── utils/        # API calls, helpers, types
```

## Tech Stack

- React 19
- Next.js 16
- TypeScript 5
- Tailwind CSS 4
- Node 20+
