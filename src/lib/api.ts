import { User, MoodEntry, Challenge, Task, Quote, Post, Conversation, Analytics } from '@/lib/types';

// Mock API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user profile
export async function fetchUserProfile(): Promise<User> {
  await delay(500);
  return {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    preferences: {
      quotesSchedule: 'morning',
      notifications: true,
      theme: 'light',
      reminderInterval: 4
    }
  };
}

// Mock analytics
export async function fetchUserAnalytics(): Promise<Analytics> {
  await delay(300);
  return {
    currentStreak: 14,
    longestStreak: 28,
    averageMood: 7.2,
    totalMoodEntries: 45,
    totalPoints: 850,
    completedChallenges: 12,
    weeklyMoodTrend: [
      { date: 'Mon', mood: 6 },
      { date: 'Tue', mood: 7 },
      { date: 'Wed', mood: 8 },
      { date: 'Thu', mood: 7 },
      { date: 'Fri', mood: 9 },
      { date: 'Sat', mood: 8 },
      { date: 'Sun', mood: 7 }
    ]
  };
}

// Mock mood entries
export async function fetchMoodEntries(): Promise<MoodEntry[]> {
  await delay(400);
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return {
      id: `mood-${i}`,
      userId: '1',
      date,
      emoji: ['😊', '😌', '🙂', '😐', '😔', '😩', '😴'][Math.floor(Math.random() * 7)],
      score: Math.floor(Math.random() * 5) + 5,
      notes: i === 0 ? 'Feeling good today!' : `Mood entry ${i}`,
      tags: ['work', 'sleep', 'exercise'].slice(0, Math.floor(Math.random() * 3) + 1),
      createdAt: date
    };
  });
}

// Mock tasks
export async function fetchTasks(): Promise<Task[]> {
  await delay(350);
  return [
    {
      id: '1',
      userId: '1',
      title: 'Morning meditation',
      description: '10 minutes of mindfulness',
      dueDate: new Date(),
      priority: 'high',
      status: 'today',
      linkedChallengeId: 'mindfulness-week',
      createdAt: new Date()
    },
    {
      id: '2',
      userId: '1',
      title: 'Journal gratitude',
      description: 'Write 3 things I\'m grateful for',
      dueDate: new Date(),
      priority: 'medium',
      status: 'today',
      createdAt: new Date()
    },
    {
      id: '3',
      userId: '1',
      title: 'Daily walk',
      description: '20 minutes outdoor walk',
      dueDate: new Date(),
      priority: 'medium',
      status: 'completed',
      createdAt: new Date(),
      completedAt: new Date()
    }
  ];
}

// Mock quotes
export async function fetchQuotes(): Promise<Quote[]> {
  await delay(300);
  return [
    {
      id: '1',
      text: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
      moodTags: ['motivation', 'purpose'],
      scheduledAt: new Date()
    },
    {
      id: '2',
      text: 'Mindfulness is a way of befriending ourselves and our experience.',
      author: 'Jon Kabat-Zinn',
      moodTags: ['calm', 'mindfulness']
    },
    {
      id: '3',
      text: 'You are not your thoughts, you are the observer of your thoughts.',
      moodTags: ['awareness', 'peace']
    }
  ];
}

// Mock challenges
export async function fetchChallenges(): Promise<Challenge[]> {
  await delay(400);
  return [
    {
      id: 'mindfulness-week',
      title: '7-Day Mindfulness Challenge',
      description: 'Practice mindfulness meditation for 10 minutes daily',
      category: 'mindfulness',
      duration: 7,
      points: 100,
      status: 'active',
      progress: 42
    },
    {
      id: 'gratitude-month',
      title: '30-Day Gratitude Journey',
      description: 'Write down 3 things you\'re grateful for each day',
      category: 'gratitude',
      duration: 30,
      points: 300,
      status: 'available',
      progress: 0
    },
    {
      id: 'movement-challenge',
      title: 'Daily Movement Challenge',
      description: 'Move your body for at least 20 minutes every day',
      category: 'movement',
      duration: 14,
      points: 200,
      status: 'completed',
      progress: 100
    }
  ];
}

// Mock community posts
export async function fetchCommunityPosts(): Promise<Post[]> {
  await delay(500);
  return [
    {
      id: '1',
      authorId: 'anon-1',
      authorName: 'Anonymous User',
      isAnonymous: true,
      title: 'Starting my wellness journey',
      content: 'Today I decided to prioritize my mental health. Any tips for beginners?',
      tags: ['beginner', 'motivation'],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      reactions: { heart: 12, hug: 8, star: 3 }
    },
    {
      id: '2',
      authorId: 'user-sarah',
      authorName: 'Sarah M.',
      isAnonymous: false,
      title: 'Meditation breakthrough!',
      content: 'After weeks of practice, I finally had a meditation session where I felt truly present.',
      tags: ['meditation', 'breakthrough', 'mindfulness'],
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      reactions: { heart: 24, hug: 15, star: 7 }
    }
  ];
}

// Mock create mood entry
export async function createMoodEntry(entry: Omit<MoodEntry, 'id'>): Promise<MoodEntry> {
  await delay(300);
  return {
    id: `mood-${Date.now()}`,
    ...entry
  };
}

// Mock update task
export async function updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
  await delay(200);
  const tasks = await fetchTasks();
  const task = tasks.find(t => t.id === taskId);
  if (!task) throw new Error('Task not found');
  
  return { ...task, ...updates };
}

// Today's quote
export async function fetchTodaysQuote(): Promise<Quote> {
  await delay(200);
  const quotes = await fetchQuotes();
  return quotes[0];
}