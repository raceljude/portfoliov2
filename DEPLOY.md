# Deployment Fix — Read Before Pushing

## The Build Error
`"tokens" is not a valid Page export field`

This happened because the old `app/page.tsx` had `export const P` and 
`export function tokens` at the top level. Next.js rejects named exports 
from page files. This version is fully fixed.

## What Changed (replace ALL these files in your repo)

```
portfolio/
├── app/
│   ├── page.tsx          ← REPLACED (no named exports)
│   └── data.ts           ← REPLACED (now just re-exports from config/)
├── config/
│   └── personal.ts       ← NEW — edit this for all your personal info
├── lib/
│   └── theme.ts          ← NEW — edit this to change colors
├── components/           ← ALL components updated
└── ...
```

## How to update your GitHub repo

Option A — Replace files manually:
1. Delete `app/page.tsx`, `app/data.ts` from your repo
2. Add the new `config/` and `lib/` folders
3. Replace all files in `components/`

Option B — Fresh repo (recommended):
1. Create a new repo
2. Extract this zip directly into it
3. `git add . && git commit -m "fix: restructure, fix Next.js export error" && git push`

## Editing your portfolio going forward
- Personal info, jobs, projects → `config/personal.ts`
- Colors → `lib/theme.ts`
- Layout/components → `components/`
