# 📚 StoryStream ADK

<div align="center">

**AI-Powered Multi-Agent Storytelling Platform**

Transform simple story seeds into complete narratives with automated social media content and visual generation.

[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%202.5%20Flash-4285F4?style=flat&logo=google)](https://ai.google.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

</div>

---

## 🌟 Overview

**StoryStream ADK** is an intelligent content creation platform that leverages Google's Gemini 2.5 Flash AI to automate the entire storytelling workflow. From a simple story idea, it generates a complete narrative, repurposes it for multiple social media platforms, and creates accompanying visuals—all through a seamless multi-agent pipeline.

### ✨ Key Features

- **🤖 Multi-Agent AI Workflow**: Three specialized AI agents working in sequence
  - **Agent 1**: Story Generation from seed ideas
  - **Agent 2**: Social Media Content Repurposing (Twitter, LinkedIn, Instagram)
  - **Agent 3**: Visual Generation (Comic strip style imagery)

- **📱 Social Media Ready**: Automatically generates platform-optimized content
  - Twitter threads with hashtags
  - LinkedIn professional posts
  - Instagram captions with emojis

- **🎨 Visual Storytelling**: AI-generated images that complement your narrative

- **⚡ Real-time Progress Tracking**: Visual feedback for each workflow stage

- **💎 Modern UI/UX**: Clean, responsive interface built with React and Lucide icons

---

## 🏗️ Architecture

```
Story Seed Input
      ↓
┌─────────────────┐
│   Agent 1       │  → Generates full story narrative
│ Story Generator │
└─────────────────┘
      ↓
┌─────────────────┐
│   Agent 2       │  → Creates platform-specific content
│ Social Repurposer│     (Twitter, LinkedIn, Instagram)
└─────────────────┘
      ↓
┌─────────────────┐
│   Agent 3       │  → Generates visual content
│ Visual Generator│     (Comic strip images)
└─────────────────┘
      ↓
   Complete Package
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dfleston/Broadcaster.git
   cd storystream-adk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📖 Usage

1. **Enter a Story Seed**: Type a brief story idea or prompt in the input field
2. **Click Generate**: Watch as the AI agents process your request
3. **Review Results**: 
   - Read the generated story
   - Copy social media posts for each platform
   - View the generated visual content

### Example Story Seeds

- "A robot discovers emotions for the first time"
- "A chef who can taste memories in food"
- "The last library on Earth after the digital age"

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19.2** | UI framework with modern hooks |
| **TypeScript 5.8** | Type-safe development |
| **Vite 6.2** | Fast build tool and dev server |
| **Google Gemini 2.5 Flash** | AI model for generation |
| **Lucide React** | Beautiful icon library |

---

## 📁 Project Structure

```
storystream-adk/
├── components/
│   ├── InputSection.tsx      # Story seed input interface
│   ├── ProgressBar.tsx        # Workflow status indicator
│   ├── SocialDashboard.tsx    # Social media content display
│   ├── StoryCard.tsx          # Generated story display
│   └── VisualsGallery.tsx     # Image gallery component
├── services/
│   └── geminiService.ts       # Gemini API integration
├── App.tsx                    # Main application component
├── types.ts                   # TypeScript type definitions
├── index.tsx                  # Application entry point
└── vite.config.ts             # Vite configuration
```

---

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)

---

<div align="center">

**Made with ❤️ using AI-powered development**

</div>
