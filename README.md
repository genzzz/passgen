# Random Password Generator

A simple, secure random password generator built with vanilla HTML, CSS, and JavaScript featuring a modern glassmorphism UI.

## Features

- 🔐 Cryptographically secure password generation
- 📋 One-click copy to clipboard with visual feedback
- 🎨 Modern glassmorphism UI with animations
- 📊 Password strength indicator
- 📱 Fully responsive design
- 🌐 Uses Google Fonts (Inter) for modern typography

## Security

- Uses `crypto.getRandomValues()` for secure randomness
- Passwords include uppercase, lowercase, numbers, and symbols
- No passwords are stored or transmitted

## Design

- Dark gradient background with animated floating orbs
- Glassmorphism card with backdrop blur
- Purple-to-violet gradient accents
- Smooth hover and click animations
- Checkmark feedback on copy

## Usage

1. Open `index.html` in a browser
2. Click "Generate Password" for a new password
3. Click the copy icon to copy to clipboard (shows ✓ when copied)

## File Structure

```
/rpg
├── index.html    # Main HTML structure
├── style.css     # Modern styling with animations
├── script.js     # Password generation logic
└── README.md     # Documentation
```

## Dependencies

- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter) (loaded via CDN)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## License

MIT