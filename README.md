# Random Password Generator

A simple, secure random password generator built with vanilla HTML, CSS, and JavaScript featuring a modern glassmorphism UI.

## Features

- 🔐 Cryptographically secure password generation
- � Adjustable password length (4-32 characters)
- 📊 Real-time password strength indicator
- 📋 One-click copy to clipboard with visual feedback
- 🎨 Modern glassmorphism UI with animations
- 📱 Fully responsive design
- 🌐 Uses Google Fonts (Inter) for modern typography

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

## Usage

1. Open `index.html` in a browser
2. Adjust the **length slider** (4-32 characters)
3. Click "Generate Password" for a new password
4. View the **strength indicator** below the button
5. Click the copy icon to copy to clipboard (shows ✓ when copied)

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