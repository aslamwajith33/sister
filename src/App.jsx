import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import ExamCountdown from './components/ExamCountdown';
import ExamTimetable from './components/ExamTimetable';
import DailyPlanner from './components/DailyPlanner';
import DailyMotivation from './components/DailyMotivation';
import PrepCorner from './components/PrepCorner';
import AchievementTracker from './components/AchievementTracker';
import StudyWellness from './components/StudyWellness';
import Footer from './components/Footer';
import EditSisterModal from './components/EditSisterModal';
import EditTimetableModal from './components/EditTimetableModal';

import {
  DEFAULT_CONFIG,
  DEFAULT_EXAMS,
  DEFAULT_TASKS,
  CBSE_CHAPTERS,
  DEFAULT_BADGES
} from './data/initialData';
import { loadFromStorage, saveToStorage } from './utils/storage';
import { triggerPinkConfetti } from './utils/confetti';
import { sound } from './utils/sound';

export default function App() {
  // 1. Core Config (Sister's Name, Brother's Name, Streak, Hugs)
  const [config, setConfig] = useState(() =>
    loadFromStorage('hsj_config_v2', DEFAULT_CONFIG)
  );

  // 2. Examination Timetable (Starts with Mathematics as 1st exam, Tamil in place of Hindi)
  const [exams, setExams] = useState(() =>
    loadFromStorage('hsj_exams_v3', DEFAULT_EXAMS)
  );

  // 3. Daily Study Tasks
  const [tasks, setTasks] = useState(() =>
    loadFromStorage('hsj_tasks', DEFAULT_TASKS)
  );

  // 4. CBSE Chapters Progress
  const [chapterProgress, setChapterProgress] = useState(() =>
    loadFromStorage('hsj_chapters', CBSE_CHAPTERS)
  );

  // 5. Pomodoro Sessions Count
  const [pomodoroCount, setPomodoroCount] = useState(() =>
    loadFromStorage('hsj_pomodoro_count', 3)
  );

  // Modals state
  const [isEditSisterOpen, setIsEditSisterOpen] = useState(false);
  const [isEditTimetableOpen, setIsEditTimetableOpen] = useState(false);

  // Synchronize to localStorage
  useEffect(() => {
    saveToStorage('hsj_config_v2', config);
  }, [config]);

  useEffect(() => {
    saveToStorage('hsj_exams_v3', exams);
  }, [exams]);

  useEffect(() => {
    saveToStorage('hsj_tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    saveToStorage('hsj_chapters', chapterProgress);
  }, [chapterProgress]);

  useEffect(() => {
    saveToStorage('hsj_pomodoro_count', pomodoroCount);
  }, [pomodoroCount]);

  // Determine the next upcoming exam
  const sortedExams = useMemo(() => {
    return [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [exams]);

  const now = Date.now();
  const nextExam = useMemo(() => {
    return (
      sortedExams.find((exam) => {
        const examTime = new Date(`${exam.date}T10:30:00`).getTime();
        return examTime > now;
      }) || null
    );
  }, [sortedExams, now]);

  const allCompleted = !nextExam && sortedExams.length > 0;

  // Real-time Countdown timer calculation (ticks every second)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      if (!nextExam) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const targetTime = new Date(`${nextExam.date}T10:30:00`).getTime();
      const difference = targetTime - Date.now();

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextExam]);

  // Chapter statistics
  const { chaptersCompletedCount, totalChaptersCount } = useMemo(() => {
    let completed = 0;
    let total = 0;
    Object.values(chapterProgress).forEach((chaps) => {
      total += chaps.length;
      completed += chaps.filter((c) => c.completed).length;
    });
    return { chaptersCompletedCount: completed, totalChaptersCount: total };
  }, [chapterProgress]);

  // Completed tasks count
  const tasksCompletedCount = useMemo(() => {
    return tasks.filter((t) => t.completed).length;
  }, [tasks]);

  // Dynamic Badges Evaluation
  const evaluatedBadges = useMemo(() => {
    return DEFAULT_BADGES.map((badge) => {
      let isUnlocked = false;
      if (badge.type === 'chapters') {
        isUnlocked = chaptersCompletedCount >= badge.reqCount;
      } else if (badge.type === 'streak') {
        isUnlocked = config.studyStreak >= badge.reqCount;
      } else if (badge.type === 'dailyTarget') {
        const targetTasks = tasks.filter((t) => t.isTarget);
        isUnlocked = targetTasks.length > 0 && targetTasks.every((t) => t.completed);
      } else if (badge.type === 'pomodoro') {
        isUnlocked = pomodoroCount >= badge.reqCount;
      }
      return {
        ...badge,
        unlocked: isUnlocked
      };
    });
  }, [chaptersCompletedCount, config.studyStreak, tasks, pomodoroCount]);

  // Handlers
  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleChapter = (subjectName, chapterId) => {
    setChapterProgress((prev) => {
      const subjectChapters = prev[subjectName] || [];
      const updated = subjectChapters.map((c) =>
        c.id === chapterId ? { ...c, completed: !c.completed } : c
      );
      return { ...prev, [subjectName]: updated };
    });
  };

  const handleSendHug = () => {
    setConfig((prev) => ({
      ...prev,
      hugsSent: (prev.hugsSent || 0) + 1
    }));
  };

  const handlePomodoroComplete = () => {
    setPomodoroCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-rose-50/30 text-slate-700 selection:bg-pink-200 selection:text-pink-900 relative pb-16 md:pb-0">
      {/* Top Navbar */}
      <Navbar
        config={config}
        onOpenEditSister={() => setIsEditSisterOpen(true)}
        streak={config.studyStreak}
      />

      {/* Main Content Area */}
      <main className="space-y-4">
        {/* 1. Homepage — Welcome Section */}
        <HomeHero
          config={config}
          onOpenEditSister={() => setIsEditSisterOpen(true)}
          nextExam={nextExam}
          countdown={countdown}
          tasks={tasks}
          chaptersCompletedCount={chaptersCompletedCount}
          totalChaptersCount={totalChaptersCount}
          streak={config.studyStreak}
        />

        {/* 2. Live Exam Countdown */}
        <ExamCountdown
          exams={sortedExams}
          nextExam={nextExam}
          countdown={countdown}
          allCompleted={allCompleted}
          onOpenTimetableEdit={() => setIsEditTimetableOpen(true)}
        />

        {/* 3. CBSE Class 10 Exam Timetable */}
        <ExamTimetable
          exams={sortedExams}
          onOpenEdit={() => setIsEditTimetableOpen(true)}
        />

        {/* 4. Daily Study Planner */}
        <DailyPlanner
          tasks={tasks}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          sisterName={config.sisterName}
        />

        {/* 5. Daily Motivation Corner */}
        <DailyMotivation sisterName={config.sisterName} />

        {/* 6. CBSE Preparation Corner */}
        <PrepCorner
          chapterProgress={chapterProgress}
          onToggleChapter={handleToggleChapter}
          sisterName={config.sisterName}
        />

        {/* 7. Achievement Tracker (Manual checkoff & custom milestones) */}
        <AchievementTracker
          sisterName={config.sisterName}
        />

        {/* 8. Study Break and Wellness (Pomodoro Timer & Healthy Habits) */}
        <StudyWellness
          onSessionComplete={handlePomodoroComplete}
          pomodoroSessionsCount={pomodoroCount}
        />
      </main>

      {/* Footer with official project name and tagline */}
      <Footer config={config} />

      {/* Modals */}
      <EditSisterModal
        isOpen={isEditSisterOpen}
        onClose={() => setIsEditSisterOpen(false)}
        config={config}
        onSave={(newCfg) => setConfig(newCfg)}
      />

      <EditTimetableModal
        isOpen={isEditTimetableOpen}
        onClose={() => setIsEditTimetableOpen(false)}
        exams={exams}
        onSave={(newExams) => setExams(newExams)}
      />
    </div>
  );
}
