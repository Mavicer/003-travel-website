# Cloudflare Pages migration

## Why Cloudflare Pages over Vercel for China

| | Vercel | Cloudflare Pages |
|---|---|---|
| China DNS | `.vercel.app` frequently blocked | `.pages.dev` — Cloudflare DNS, more stable in China |
| CDN | No China nodes | 330+ cities globally, better Asia routing |
| Build | Same DX (`git push` → deploy) | Same DX |
| Cost | Free | Free (unlimited bandwidth) |
| Domain | `003-travel-website.vercel.app` | `{project}.pages.dev` |

## Settings

```
Framework preset:  Vite
Build command:     npm run build
Output directory:  dist
Root directory:    /
Environment:       None needed (purely static)
```

## What you need to do

1. Open https://dash.cloudflare.com/sign-up — create free account
2. Go to Workers & Pages → Pages → "Connect to Git"
3. Select GitHub → the `Mavicer/003-travel-website` repo
4. Enter build settings (above)
5. Click "Save and Deploy"

After deployment (~2 min), the site will be live at `{project-name}.pages.dev`.
