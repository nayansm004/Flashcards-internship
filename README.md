# Flashcards App

A React flashcard app with 3D flip animation, category filtering, score tracking, and confetti on completion.

## Tech Stack
- React 18 + Vite
- CSS Modules
- canvas-confetti

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for Hosting

```bash
npm run build
```

Upload the `dist/` folder to any static host:
- **Netlify**: drag & drop the `dist/` folder at netlify.com/drop
- **Vercel**: `npx vercel --prod` from the project root
- **GitHub Pages**: push `dist/` contents to a `gh-pages` branch

## Keyboard Shortcuts
- `Space` — flip card
- `↑` — mark as knew it
- `↓` — mark as missed
- `→` — skip

## Adding Your Own Cards

Edit `src/data.js` and add objects to the `cards` array:

```js
{ id: 17, question: "Your question?", answer: "Your answer.", category: "YourCategory" }
```

Categories are auto-detected — just use any string and a filter pill will appear.
