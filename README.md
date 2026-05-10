# Kavi Automation — Website

AI Systems Studio website. Built with React + Vite + Tailwind.

## 🚀 Deploy කරන විදිහ (Browser Only — No Terminal)

### 1. GitHub වලට upload කරන්න

1. github.com → Sign up (free)
2. "New repository" → name: `kavi-automation-site` → Public → Create
3. "uploading an existing file" link → drag-and-drop සියලු files
4. "Commit changes" click කරන්න

### 2. Vercel වලට connect කරන්න

1. vercel.com → "Sign up with GitHub"
2. "Add New Project" → ඔබේ repo select කරන්න
3. "Deploy" click — 2 minutes ඇතුළත live!

### 3. Custom domain connect කරන්න

1. Vercel → Project → Settings → Domains
2. `kaviautomation.com` add කරන්න
3. Vercel ඔබට DNS records දෙනවා — domain provider එකේ update කරන්න
4. 24 hours ඇතුළත live

## ✏️ Edit කරන විදිහ

### Browser එකේ (quick edits)
- GitHub → ඔබේ repo → file open → pencil icon → edit → "Commit"
- Vercel auto-detect කරලා 30 seconds ඇතුළත site update කරයි

### VS Code එකේ (serious edits)
- VS Code download කරන්න
- "Clone repository" → ඔබේ GitHub URL paste
- Edit කරලා, GitHub Desktop app වලින් push

## 🔧 Configuration

මේවා update කරගන්න ඕනි:

- **n8n webhook URL** — `src/App.jsx` → search `YOUR_N8N_WEBHOOK_URL_HERE`
- **Email** — search `hello@kaviautomation.com`
- **LinkedIn** — search LinkedIn link placeholder
- **Founder photo** — `public/hansani.jpg` save කරලා, App.jsx founder section comment follow කරන්න

## 📦 Tech Stack

- React 18
- Vite (build tool)
- Tailwind CSS 3
- Lucide React (icons)
