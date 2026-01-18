# Random Password Generator

A secure random password generator built with **TypeScript**, **Vite**, and modern CSS featuring a glassmorphism UI.

🔗 **Live Demo:** [https://genzzz.github.io/passgen/](https://genzzz.github.io/passgen/)

## Features

- 🔐 Cryptographically secure password generation
- 📏 Adjustable password length (4-32 characters)
- 📊 Real-time password strength indicator
- 📋 One-click copy to clipboard with visual feedback
- 🎨 Modern glassmorphism UI with animations
- 📱 Fully responsive design
- ⚡ Fast development with Vite + TypeScript

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling
- **CSS3** - Modern styling with animations
- **Google Fonts** - Inter typeface

## Security

- Uses `crypto.getRandomValues()` for secure randomness
- Passwords include uppercase, lowercase, numbers, and symbols
- No passwords are stored or transmitted
- Strength calculated based on length and character variety

## Design

- Dark gradient background with animated floating orbs
- Glassmorphism card with backdrop blur
- Purple-to-violet gradient accents
- Custom styled range slider for length control
- Color-coded strength indicator (Weak → Fair → Good → Strong)
- Smooth hover and click animations
- Checkmark feedback on copy

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/genzzz/passgen.git
cd passgen

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## File Structure

```
/rpg
├── index.html        # Entry HTML file
├── src/
│   ├── main.ts       # TypeScript application code
│   └── style.css     # Modern styling with animations
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite configuration (if present)
├── package.json      # Dependencies and scripts
└── README.md         # Documentation
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## License

MIT