# HER SUCCESS JOURNEY 🌸
### *Little Steps. Big Dreams. Beautiful Success. ❤️*

> A personal, aesthetic, and loving CBSE Class 10 Exam Companion website built with love by a brother for his sister.

---

## 🎀 Project Purpose & Story

**Her Success Journey** is not a generic educational portal—it is a warm, aesthetic, and emotionally supportive study companion made to make your sister feel confident, loved, organized, and excited about her CBSE Class 10 Board Examinations.

Every section has been crafted with a cozy soft-pink aesthetic, gentle animations, supportive affirmations, practical revision tools, and a heartfelt message from her brother reminding her that she is capable of achieving anything.

---

## ✨ Key Features & Modules

1. **Homepage — Welcome Dashboard**
   - Welcoming heading: `"Hey, Superstar! ✨"`
   - Subtitle: `"Welcome to your success journey. Every small step takes you closer to your dreams!"`
   - Real-time date display with time-of-day greeting (Morning / Afternoon / Evening).
   - Editable Sister's Name & Brother's Nickname (saved persistently in LocalStorage).
   - Cute SVG study desk illustration with steaming cocoa mug, books, plant, and stars.
   - Quick overview stats: Days to next exam, today's target goals, syllabus mastery percentage, and daily study streak.

2. **Live Real-Time Exam Countdown**
   - Working real-time countdown timer down to the second (Days, Hours, Minutes, Seconds).
   - Automatically detects the earliest upcoming subject from the timetable.
   - Live updates every 1 second.
   - Automatically rolls over to the next exam once a paper finishes.
   - Celebratory confetti and congratulatory screen when all examinations conclude.
   - Individual subject selector to check the countdown for any specific paper anytime.

3. **CBSE Class 10 Exam Timetable (Tamil Edition 🌸)**
   - Includes **Tamil (Language & Literature - 006)** in place of Hindi, alongside Mathematics (041/241), Science (086), Social Science (087), English (184), and Information Technology (402).
   - Displays Subject name, Code, Examination Date, Day, Examination Time (10:30 AM – 01:30 PM), countdown badge, and syllabus status.
   - **Fully Configurable**: Click **"Edit / Update Timetable"** to change exam dates, times, room numbers, or add new subjects as soon as the official CBSE admit card is released!

4. **Daily Study Planner**
   - Add daily study tasks with Subject, Chapter, Priority (High / Medium / Low), Estimated time, and "Daily Target" must-do flag.
   - Quick idea presets (+ Revise 1 Formula Sheet, + 2 Ray Diagrams, + 5 PYQs).
   - Functional completion checkboxes with Web Audio marimba chime sound.
   - Real-time circular percentage progress gauge for daily targets.
   - Celebratory banner and confetti when 100% of daily targets are achieved:
     > *"🌟 Outstanding work! You achieved all your daily targets today! Take a cozy rest, you earned it! 🌸"*

5. **Daily Motivation Corner**
   - Quote of the day with automatic calendar-based rotation and a **"Shuffle Quote ✨"** button.
   - Includes all required supportive quotes:
     - *"Believe in yourself. You are capable of amazing things!"*
     - *"Every chapter you complete brings you one step closer to success."*
     - *"Don't compare your journey with anyone else's."*
     - *"Your hard work today will become your confidence tomorrow."*
     - *"Small progress every day leads to big achievements."*
     - *"You don't need to be perfect. Just give your best."*
     - *"Stay calm, stay focused and trust yourself."*
   - **4-7-8 Deep Breathing Guide**: Interactive expanding circle to dissolve exam anxiety in 60 seconds.
   - **Sister's Victory & Confidence Jar**: Persistent jar to log daily study wins.

6. **CBSE Preparation Corner**
   - Subject-wise revision notes and essential formulas for:
     - **Mathematics**: Quadratic formula, AP, Trigonometric identities, Coordinate geometry, Surface areas & volumes, Statistics empirical formula, step-marking tips.
     - **Science**: Ray diagram rules, sign conventions, Ohm's law, Mendelian ratios, balancing chemical reactions, Biology diagrams.
     - **Social Science**: History key timelines, 5-mark answer blueprint, Geography map points, Civics and Economics key terms.
     - **Tamil (Class 10)**: தமிழ் இலக்கணம் (தொகைநிலை / தொகாநிலைத் தொடர்கள்), செய்யுள் நயம், மனப்பாடப் பாடல் குறிப்புகள், கடிதம் மற்றும் கட்டுரை வரைவு.
     - **English**: Formal letter structure, Analytical paragraph template, Literature character sketches.
     - **Information Technology (402)**: LibreOffice Writer styles, Calc scenarios, DBMS SQL commands, cybersecurity.
   - **Interactive Chapter Checklist**: Check off chapters across all subjects to dynamically calculate your syllabus completion percentage!

7. **Achievement Tracker**
   - Badges and milestones with unlock calculations:
     - 🌸 *First Chapter Completed*
     - 📚 *5 Chapters Completed*
     - 🏆 *10 Chapters Completed*
     - 👑 *Revision Champion*
     - ⭐ *Consistency Star*
     - 🦸‍♀️ *Daily Study Hero*
     - 🧘‍♀️ *Focus Master*
     - ✨ *Board Exam Ready*
   - Master progress bar celebrating her learning momentum.

8. **A Little Message From Your Brother ❤️**
   - Section Title: **"A Little Message From Your Brother ❤️"**
   - Exact message:
     > **"Dear sister, I believe in you. Give your best! ❤️"**
   - Soft pastel pink card with wax seal emblem, delicate floral borders, and floating hearts.
   - **"Send Brother a Virtual Hug 🤗"** button with live hug counter and bursting heart confetti.

9. **Study Break and Wellness**
   - Pomodoro study timer: 25-minute study block, 5-minute short break, 15-minute long break.
   - Customizable minute settings.
   - Web Audio meditation chime on session completion.
   - Gentle wellness reminders: Water intake 💧, 20-20-20 eye rest 👀, posture stretch 🧘‍♀️, and 7-8 hours restful sleep 🌙.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (Soft pastel pink, blush rose, champagne gold accents)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti + Web Audio API synthesizer (no external audio assets required)
- **Data Persistence**: LocalStorage (auto-saves tasks, chapters, timetable, streak, preferences)

---

## 🚀 Running Locally

### 1. Prerequisites
- Node.js (version 18 or newer)
- npm

### 2. Start the Development Server
In your terminal, navigate to the project directory:
```bash
cd "d:\Documents\PYTHON PRAC\10th board xm"
npm run dev
```

Open your browser at the URL shown (typically `http://localhost:5173`).

### 3. Build for Production
```bash
npm run build
```
This produces an optimized production bundle in the `dist` folder.

---

## ☁️ Deploying to Vercel

### Method A: Deploy via Vercel CLI (Fastest)
1. Install Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```
2. Run deployment command in the project folder:
   ```bash
   vercel
   ```
3. Follow the quick prompts in your terminal. For production deployment:
   ```bash
   vercel --prod
   ```

### Method B: Deploy via GitHub + Vercel Dashboard
1. Initialize git and commit your code:
   ```bash
   git init
   git add .
   git commit -m "Her Success Journey - CBSE Class 10 Companion Website"
   ```
2. Push your repository to GitHub.
3. Log in to [vercel.com](https://vercel.com).
4. Click **"Add New"** > **"Project"** and import your GitHub repository.
5. Vercel will automatically detect **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Deploy"**. Your sister will receive a live, shareable URL!

---

*Made with endless love by her brother for CBSE Class 10 Board Examinations. You've got this, Superstar! 🌸✨*
