# 🇯🇵 外语邪修

A beautiful, modern Japanese language learning application built with Fresh,
Preact, and Signals. Master JLPT N5 level Japanese through interactive quizzes
covering vocabulary, grammar, kanji, and reading comprehension.

![Fresh](https://img.shields.io/badge/Fresh-2.2.0-yellow)
![Preact](https://img.shields.io/badge/Preact-10.27.2-purple)
![Signals](https://img.shields.io/badge/Signals-2.5.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## ✨ Features

### 🎯 Interactive Quiz System

- **30+ N5 Level Questions** covering all essential topics
- **4 Question Types**: Vocabulary, Grammar, Kanji, and Reading Comprehension
- **Random Question Selection** - Get 10 different questions each time
- **Real-time Feedback** - Instant answer validation with detailed explanations
- **Progress Tracking** - Visual progress bar and score tracking
- **Pass/Fail Criteria** - 70% pass mark (7/10 questions)

### 🎨 Beautiful Modern UI

- **Gradient Designs** - Stunning purple, pink, and orange gradients throughout
- **Glass Morphism** - Frosted glass effects with backdrop blur
- **Smooth Animations** - Butter-smooth transitions and hover effects
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Custom Scrollbar** - Themed scrollbar matching the color scheme
- **Typography** - Clean, readable fonts with proper hierarchy

### ⚡ Performance & Architecture

- **Server-Side Rendering (SSR)** - Questions generated on the server for fast
  initial load
- **Islands Architecture** - Minimal JavaScript, maximum performance
- **Preact Signals** - Fine-grained reactivity without re-renders
- **Zero useState** - Pure signal-based state management
- **Optimized Assets** - Fast loading times and smooth interactions

## 🚀 Quick Start

### Prerequisites

- [Deno](https://deno.land/) 1.37 or higher

### Installation & Development

```bash
# Clone the repository
git clone <your-repo-url>
cd lang-master

# Install dependencies (Deno handles this automatically)
deno task dev
```

The app will be available at `http://localhost:8000`

### Production Build

```bash
# Build for production
deno task build

# Start production server
deno task start
```

## 📁 Project Structure

```
lang-master/
├── assets/
│   └── styles.css              # Global styles with animations & utilities
├── components/
│   └── Button.tsx              # Reusable button component
├── islands/
│   ├── Counter.tsx             # Example counter island
│   └── QuizGame.tsx            # Interactive quiz game (Signals-based)
├── routes/
│   ├── _app.tsx                # Root app layout with meta tags
│   ├── index.tsx               # Beautiful home page
│   └── quiz.tsx                # Quiz page with SSR
├── static/
│   ├── favicon.ico             # Site favicon
│   └── logo.svg                # Logo
├── utils/
│   └── quizData.ts             # Quiz questions database
├── client.ts                   # Client entry point
├── deno.json                   # Deno configuration
├── main.ts                     # Server entry point
├── utils.ts                    # Shared utilities
└── vite.config.ts              # Vite configuration
```

## 🎓 Quiz System Details

### Question Types

#### 📚 Vocabulary

Test your knowledge of basic Japanese words and phrases:

- Common nouns (book, water, school, etc.)
- Adjectives (expensive, cheap, big, etc.)
- Time expressions (tomorrow, yesterday, etc.)

#### ✍️ Grammar

Practice essential N5 grammar patterns:

- Particles (は, を, に, で, が, etc.)
- Verb conjugations (present, past, negative)
- Basic sentence structures

#### 漢 Kanji

Learn to read and understand basic kanji:

- Essential kanji (人, 日本, 食べる, 山, 車, etc.)
- Readings and meanings
- Common compounds

#### 📖 Reading Comprehension

Understand simple Japanese sentences:

- Daily life situations
- Time and dates
- Basic conversations

### Quiz Flow

1. **Start** → Click "Start Quiz" from home page or navigate to `/quiz`
2. **Answer** → Select one of four multiple-choice answers
3. **Submit** → Click "Submit Answer" to validate
4. **Learn** → Read the detailed explanation
5. **Continue** → Move to the next question
6. **Results** → View your final score and performance

### Scoring System

- **Pass Mark**: 70% (7 out of 10 questions)
- **Instant Feedback**: Know immediately if you're correct
- **Detailed Explanations**: Learn from every question
- **Score Tracking**: See your score throughout the quiz

## 🎨 UI/UX Highlights

### Color Palette

- **Primary**: Purple (#a855f7) to Pink (#ec4899)
- **Secondary**: Orange (#f97316) to Yellow
- **Success**: Green (#10b981) to Emerald (#059669)
- **Error**: Red (#ef4444) to Pink (#ec4899)
- **Neutral**: Gray scale for text and backgrounds

### Design Features

- **Gradient Backgrounds**: Multi-stop gradients for visual depth
- **Rounded Corners**: Consistent 2xl-3xl border radius
- **Shadows**: Layered shadows for depth perception
- **Hover Effects**: Scale transforms and shadow transitions
- **Focus States**: Clear outline for accessibility
- **Loading States**: Smooth state transitions

### Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Visible focus states
- **Color Contrast**: WCAG AA compliant
- **Semantic HTML**: Proper heading hierarchy
- **Screen Reader Ready**: ARIA labels where needed

## 🛠️ Technology Stack

### Frontend Framework

- **Fresh 2.2.0** - Next-gen web framework for Deno
- **Preact 10.27.2** - Fast 3kB React alternative
- **Preact Signals 2.5.0** - Reactive state management

### Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Additional animations and utilities
- **Glass Morphism** - Modern frosted glass effects

### Build Tools

- **Vite 7.1.3** - Lightning-fast build tool
- **Deno** - Secure TypeScript/JavaScript runtime
- **TypeScript** - Type-safe development

## 📝 State Management with Signals

This project exclusively uses **Preact Signals** for state management. No
useState!

### Example: Quiz State

```typescript
// Signal declarations
const currentQuestionIndex = useSignal(0);
const selectedAnswer = useSignal<number | null>(null);
const score = useSignal(0);
const showExplanation = useSignal(false);
const quizCompleted = useSignal(false);

// Computed values
const currentQuestion = useComputed(
    () => questions[currentQuestionIndex.value],
);
const progress = useComputed(
    () => ((currentQuestionIndex.value + 1) / questions.length) * 100,
);
```

### Benefits of Signals

- ✅ No unnecessary re-renders
- ✅ Automatic dependency tracking
- ✅ Simpler code - no useEffect, useMemo, or useCallback
- ✅ Better performance
- ✅ More predictable updates

## 🌟 Features in Detail

### Home Page

- **Hero Section** with Japanese text and emoji
- **Feature Cards** highlighting each question type
- **How It Works** section with step-by-step guide
- **Call-to-Action** sections encouraging quiz start
- **Responsive Navigation** with smooth scrolling
- **Beautiful Footer** with links and branding

### Quiz Page

- **Sticky Navigation** with back-to-home link
- **Progress Indicator** showing current question and score
- **Type Badges** color-coded by question type
- **Answer Options** with hover and selection states
- **Explanation Cards** with success/error styling
- **Results Screen** with congratulations or encouragement

### Responsive Design

- **Mobile-First** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Flexible Layouts** adapting to screen size
- **Touch-Friendly** buttons and interactions

## 🎯 Future Enhancements

### Planned Features

- [ ] User authentication and profiles
- [ ] Score history and statistics
- [ ] Leaderboard system
- [ ] N4, N3, N2, N1 level support
- [ ] Timed quiz mode
- [ ] Audio pronunciation
- [ ] Hiragana/Katakana practice
- [ ] Flashcard study mode
- [ ] PDF export of results
- [ ] Dark mode support

### Potential Improvements

- [ ] Question filtering by type
- [ ] Difficulty levels
- [ ] Spaced repetition algorithm
- [ ] Social sharing features
- [ ] Progress tracking over time
- [ ] Custom quiz creation
- [ ] Multiplayer quiz battles

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Use Preact Signals (not useState)
2. Follow the existing code style
3. Write meaningful commit messages
4. Test on multiple screen sizes
5. Ensure accessibility standards

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **JLPT** - Japanese Language Proficiency Test for question inspiration
- **Fresh Team** - For the amazing framework
- **Preact Team** - For Signals and the lightweight library
- **Deno Team** - For the secure runtime

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using Fresh, Preact Signals, and TypeScript**

**がんばって！(Good luck!)**
