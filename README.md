# NoteHub

Multi-page notes app built with Next.js App Router, TypeScript, Axios, TanStack Query, and CSS Modules.

## Getting started

1. Install dependencies with `npm install`.
2. Create `.env.local` and set `NEXT_PUBLIC_NOTEHUB_TOKEN` to your NoteHub API token.
3. Start the development server with `npm run dev`.

The app is available at `http://localhost:3000`. Note lists and note details are prefetched on the server and hydrated into TanStack Query on the client.

## Checks

- `npm run lint`
- `npm run format:check`
- `npm run build`
