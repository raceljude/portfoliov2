# Racel Jude Marahay — Portfolio

A modern, compact portfolio web app built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed with a dark editorial aesthetic, smooth animations, and clickable experience cards for deep-dive exploration.

## ✨ Features

- **Dark editorial aesthetic** — custom dark theme with warm accent colors
- **Animated entrance** — staggered fade-up animations on load
- **Experience cards** — click any role to open a detailed modal
- **Skills grid** — color-coded by category
- **Fully responsive** — works on mobile, tablet, and desktop
- **Grain overlay** — subtle texture for depth
- **Vercel-ready** — zero-config deployment

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 | Framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Framer Motion | (optional advanced animations) |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/racel-jude-portfolio.git
cd racel-jude-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

### Option 1 — Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js.

### Option 2 — GitHub + Vercel Dashboard

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Click **Deploy** — done!

Vercel will auto-deploy on every push to `main`.

## 📁 Project Structure

```
├── app/
│   ├── globals.css       # Global styles + font imports
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main portfolio page
│   └── data.ts           # All resume data (edit this!)
├── components/
│   ├── ExperienceCard.tsx  # Clickable experience card
│   ├── ExperienceModal.tsx # Deep-dive modal
│   └── SkillBadge.tsx      # Skill pill with color coding
├── public/               # Static assets
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

## ✏️ Customization

All resume content lives in `app/data.ts`. Edit the exported objects:

- `profile` — name, title, contact info
- `education` — school, degree, years
- `skills` — array of `{ label, category }` objects
- `experiences` — array with full role details, stack, highlights

To update your social links, edit `app/page.tsx` and replace the GitHub/LinkedIn `href` values.

## 📄 License

MIT
