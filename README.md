# Tiya Jain — Portfolio

React + TypeScript + Vite. No backend needed: the contact form uses Web3Forms.

## Run
```bash
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm run dev               # http://localhost:5173
```

## Contact form (Web3Forms)
1. web3forms.com → create a key with your email (use `localhost` as the website for now).
2. Put it in `.env`: `VITE_WEB3FORMS_KEY=your-key`
3. Restart `npm run dev`. On Vercel add the same variable under Settings → Environment Variables.

## Interactions
- Cursor spotlight, light trail and click bursts
- Draggable 3D tech sphere with category filters
- Project cards with 3D tilt and full-screen case studies (Back button always visible, Esc also closes)
- Press **Ctrl K** (⌘K on Mac) to jump to any section


## Deploy
Push to GitHub, import the repo on Vercel (framework: Vite), add `VITE_WEB3FORMS_KEY`.
