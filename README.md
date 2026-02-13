# Terminal Portfolio v2.0

A premium, production-grade terminal portfolio built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features a cinematic theme system, advanced commands, and recruiter-optimized content.

## 🚀 Features

- **6 Premium Themes**: Pro Hacker, Cyberpunk, Dracula, Nord, Matrix, Monokai
- **Advanced Command System**: 20+ commands with fuzzy matching and autocomplete
- **Visual Effects**: Matrix rain, scanlines, CRT effect, glassmorphism
- **Recruiter Optimized**: Quick overview, impact metrics, and hiring commands
- **Fully Responsive**: Mobile-optimized with touch support
- **Type-Safe**: Full TypeScript implementation
- **Performance**: Code splitting, memoization, and lazy loading

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Build

```bash
npm run build
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Netlify

```bash
npm run build
# Deploy the 'out' directory
```

### Static Export

The project is configured for static export. After building, deploy the `out` directory to any static hosting service.

## 📚 Available Commands

### Portfolio
- `about` - Learn about Amit
- `skills` - View technical skills (try `--graph`)
- `experience` - Professional experience
- `education` - Educational background
- `projects` - Notable projects
- `achievements` - Awards and achievements
- `certifications` - Professional certifications
- `resume` - View/download resume

### Recruiter
- `recruiter` - Quick overview for recruiters
- `hire` - Why you should hire Amit
- `impact` - Quantified achievements
- `stack` - Technology stack summary

### System
- `neofetch` - System information
- `theme` - Change theme (try `theme --list`)
- `clear` - Clear terminal
- `socials` - Social media links
- `help` - Show all commands

### Fun
- `sudo` - Try it and see!
- `matrix` - Toggle matrix rain effect
- `timeline` - Career timeline view
- `easteregg` - Hidden easter egg

## 🎨 Themes

Switch themes using: `theme [name]`

- **pro-hacker** - Green on black with scanlines (default)
- **cyberpunk** - Neon pink and cyan with glassmorphism
- **dracula** - Purple and pink palette
- **nord** - Cool arctic blue tones
- **matrix** - Classic green with rain effect
- **monokai** - Warm syntax highlighting colors

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State**: Zustand
- **Search**: Fuse.js
- **Fonts**: JetBrains Mono, Fira Code

## 📁 Project Structure

```
├── app/                  # Next.js app directory
├── components/           # React components
├── commands/            # Command implementations
├── context/             # React contexts
├── hooks/               # Custom hooks
├── themes/              # Theme definitions
├── types/               # TypeScript types
├── utils/               # Utility functions
└── config/              # Configuration files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 👤 Author

**Amit Bhati**
- Email: amitr3245@gmail.com
- LinkedIn: [Amit Bhati](https://linkedin.com/in/amit-bhati)
- GitHub: [@amit-bhati](https://github.com/amit-bhati)

---

Built with ❤️ using Next.js and TypeScript
