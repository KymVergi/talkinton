# My Talking Ton - Multi Lingual AI Bot

A modern web application built with Next.js that brings the My Talking Ton experience to your browser. Features voice recognition, speech synthesis, and multilingual support.

## 🌟 Features

- 🎤 **Voice Recognition** - Talk to Ton using your microphone
- 🗣️ **Speech Synthesis** - Ton responds with his signature voice in multiple languages
- 🌍 **Multilingual** - Support for 50+ languages
- 🎨 **Modern Design** - Inspired by My Talking Ton's visual style
- ⚡ **Next.js 14** - Optimized performance with App Router
- 🎭 **Smooth Animations** - Using Framer Motion

## 🚀 Quick Start

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production
npm start
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
my-talking-ton/
├── app/
│   ├── chat/
│   │   └── page.tsx         # Chat page with Ton
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Main layout
│   └── page.tsx             # Home page
├── public/
│   └── images/              # Ton images
├── src/
│   ├── components/          # Reusable components
│   └── hooks/               # Custom hooks
├── package.json
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
\`\`\`

## 🎮 How to Use

1. **Home Page**: Explore My Talking Ton game features
2. **Chat with Ton**: 
   - Select Ton's language
   - Tap Ton's image to activate the microphone
   - Speak clearly
   - Listen to Ton's response!

## 🛠️ Technologies

- **Next.js 14** - React framework
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Web Speech API** - Voice recognition and synthesis

## 📝 Notes

- Voice recognition requires a compatible browser (Chrome, Edge, Safari)
- Microphone permission is needed for voice functionality
- Available voices depend on your operating system and browser

## 🎨 Customization

Main colors can be modified in \`tailwind.config.js\`:

\`\`\`js
colors: {
  tom: {
    purple: '#9747FF',
    blue: '#00C3FF',
    pink: '#FF2D92',
    navy: '#2B2842',
  },
}
\`\`\`

## 📄 License

Based on the original [RealTalkingTom](https://github.com/girliemac/web-speech-ai) code by Tomomi Imura.

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss the changes you would like to make.

---

Made with ❤️ using Next.js and Web Speech API
