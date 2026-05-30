# AI Canvas

AI-powered image generation platform. Generate stunning images from text prompts.

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **AI:** Vertex AI, Vercel AI SDK
- **Database & Storage:** Supabase
- **Auth:** Clerk

## Features

- **Image Generation** – Generate images using Google Vertex AI
- **Cloud Storage** – Store images via Supabase
- **Database** – Track generations in Supabase
- **Authentication** – Secure auth with Clerk

## Setup

```bash
# Install dependencies
npm install

# Add environment variables to .env.local
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SECRET_KEY=...
GOOGLE_APPLICATION_CREDENTIALS=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# Run development server
npm run dev
```

## Usage

1. Sign in with Clerk
2. Enter a prompt and select image size
3. Generate image – AI creates and stores it

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production
npm run lint     # Lint code
```

## Status

**UI/UX improvements in progress** 

