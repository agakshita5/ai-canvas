# AI Canvas

An AI image **studio** — not just a generator. Create images from text (or your voice), edit and expand them with AI, and arrange everything on an infinite, zoomable canvas.

## Features

- **AI Image Generation** – Text-to-image with Google Vertex AI (Imagen 3), with selectable aspect ratios.
- **Infinite Canvas** – A React Flow workspace: place multiple images per chat, drag, zoom, pan, duplicate, and delete.
- **AI Editing** – Edit any image with a natural-language prompt — optionally guided by a reference image — using Gemini 2.5 Flash Image. 
- **Smart Resize (Outpainting)** – Expand an image to 16:9, 9:16, 4:3 or 3:4; AI extends the scene while keeping the subject intact.
- **Voice Prompts** – Dictate prompts hands-free via the browser's Web Speech API.
- **Auth, Storage & DB** – Clerk authentication, Supabase Storage, and Supabase PostgreSQL.

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, React Flow (`@xyflow/react`), Phosphor Icons
- **AI:** Vertex AI · Imagen 3 (generation), Gemini 2.5 Flash Image (editing & outpainting), Vercel AI SDK (`ai` v6)
- **Database & Storage:** Supabase (PostgreSQL + Storage)
- **Auth:** Clerk

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Add environment variables to .env.local
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SECRET_KEY=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
# Google Cloud (Vertex AI) — either a path to a service-account key file…
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
# …or the raw JSON (used in serverless/Vercel; written to /tmp at runtime)
GOOGLE_CREDENTIALS_JSON={...}

# 3. Run the dev server
npm run dev
```

### Cloud prerequisites

- **Supabase:** a `generations` table (`id`, `user_id`, `prompt`, `image_url`, `sb_public_id`, `aspect_ratio`, `session_id`, `created_at`) with **RLS enabled** (server access uses the secret key, which bypasses RLS), and a private **`generated-images`** Storage bucket.
- **Google Cloud:** enable **Vertex AI** and ensure the **Imagen** and **Gemini 2.5 Flash Image** models are available in your region.

## Usage

1. Sign in with Clerk.
2. Type (or **speak**) a prompt, pick an aspect ratio, and **Generate**.
3. On the canvas, select an image to **Edit**, **Resize**, **Duplicate**, **Download**, or **Delete** it.
4. Switch chats from the sidebar; **New Chat** starts a fresh canvas.

> **Voice input** uses the browser's built-in speech service — works in **Chrome, Edge, and Safari**. Requires HTTPS (or localhost during development).

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production
npm run lint     # Lint code
```
