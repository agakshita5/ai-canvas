# AI Canvas

AI-powered image generation platform. Generate stunning images from text prompts with semantic search to find similar generations.

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **AI:** Vertex AI, Vercel AI SDK
- **Database:** Supabase
- **Storage:** Cloudinary
- **Auth:** Clerk

## Features

- **Image Generation** – Generate images using Google Vertex AI
- **Semantic Search** – Find similar generations using embeddings
- **Cloud Storage** – Store images via Cloudinary
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
CLOUDINARY_URL=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# Run development server
npm run dev
```

## Usage

1. Sign in with Clerk
2. Enter a prompt and select image size
3. Generate image – AI creates and stores it
4. Search similar generations using semantic matching

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production
npm run lint     # Lint code
```

## Status

**UI/UX improvements in progress** 

