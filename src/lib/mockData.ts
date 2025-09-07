import { User, MoodEntry, Challenge, Task, Quote, Post, Conversation, Message, Analytics } from "./types";

// Mock User Data
export const mockUser: User = {
  id: "user-1",
  name: "Sarah Mitchell",
  email: "sarah@example.com",
  avatarUrl: "/avatars/sarah.jpg",
  preferences: {
    quotesSchedule: "morning",
    notifications: true,
    theme: "light",
    reminderInterval: 4,
  },
  createdAt: new Date("2024-01-15"),
};

// Mock Mood Entries
export const mockMoodEntries: MoodEntry[] = [
  {
    id: "mood-1",
    userId: "user-1",
    date: new Date(),
    emoji: "😊",
    score: 8,
    notes: "Had a great morning meditation session!",
    tags: ["meditation", "morning", "peaceful"],
    createdAt: new Date(),
  },
  {
    id: "mood-2",
    userId: "user-1",
    date: new Date(Date.now() - 86400000), // Yesterday
    emoji: "😌",
    score: 7,
    notes: "Feeling calm after yoga class",
    tags: ["yoga", "calm", "exercise"],
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: "mood-3",
    userId: "user-1",
    date: new Date(Date.now() - 172800000), // 2 days ago
    emoji: "😔",
    score: 4,
    notes: "Bit stressed about work deadlines",
    tags: ["work", "stress", "deadlines"],
    createdAt: new Date(Date.now() - 172800000),
  },
];

// Mock Challenges
export const mockChallenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "7-Day Gratitude Journey",
    description: "Write down 3 things you're grateful for each day",
    category: "gratitude",
    duration: 7,
    points: 50,
    status: "active",
    startDate: new Date(Date.now() - 259200000), // 3 days ago
    progress: 43,
  },
  {
    id: "challenge-2",
    title: "Mindful Breathing Challenge",
    description: "Practice 5 minutes of mindful breathing daily",
    category: "mindfulness",
    duration: 14,
    points: 75,
    status: "available",
    progress: 0,
  },
  {
    id: "challenge-3",
    title: "Random Acts of Kindness",
    description: "Perform one act of kindness each day",
    category: "social",
    duration: 5,
    points: 40,
    status: "completed",
    startDate: new Date(Date.now() - 604800000), // 1 week ago
    completedDate: new Date(Date.now() - 172800000), // 2 days ago
    progress: 100,
  },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: "task-1",
    userId: "user-1",
    title: "Morning meditation",
    description: "10-minute guided meditation",
    priority: "high",
    status: "today",
    linkedChallengeId: "challenge-2",
    createdAt: new Date(),
  },
  {
    id: "task-2",
    userId: "user-1",
    title: "Write gratitude list",
    description: "List 3 things I'm grateful for today",
    priority: "medium",
    status: "today",
    linkedChallengeId: "challenge-1",
    createdAt: new Date(),
  },
  {
    id: "task-3",
    userId: "user-1",
    title: "Call mom",
    description: "Weekly check-in call",
    priority: "medium",
    status: "this-week",
    dueDate: new Date(Date.now() + 172800000), // 2 days from now
    createdAt: new Date(),
  },
  {
    id: "task-4",
    userId: "user-1",
    title: "Read wellness article",
    description: "Find and read an inspiring wellness article",
    priority: "low",
    status: "later",
    createdAt: new Date(),
  },
];

// Mock Quotes
export const mockQuotes: Quote[] = [
  {
    id: "quote-1",
    text: "The present moment is the only time over which we have dominion.",
    author: "Thích Nhất Hạnh",
    category: "mindfulness",
    moodTags: ["calm", "anxious"],
    isDaily: true,
  },
  {
    id: "quote-2",
    text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
    author: "A.A. Milne",
    category: "motivation",
    moodTags: ["sad", "confident"],
    isDaily: false,
  },
  {
    id: "quote-3",
    text: "Gratitude turns what we have into enough.",
    author: "Anonymous",
    category: "gratitude",
    moodTags: ["grateful", "content"],
    isDaily: false,
  },
];

// Mock Community Posts
export const mockPosts: Post[] = [
  {
    id: "post-1",
    authorId: "user-2",
    authorName: "Alex",
    isAnonymous: false,
    title: "Celebrating 30 days of meditation!",
    content: "Just hit my 30-day meditation streak! Started with just 5 minutes and now doing 20. The mental clarity is incredible. Anyone else on a meditation journey?",
    category: "celebration",
    tags: ["meditation", "milestone", "mindfulness"],
    reactions: { heart: 12, hug: 3, star: 8 },
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    updatedAt: new Date(Date.now() - 3600000),
  },
  {
    id: "post-2",
    authorId: "user-3",
    authorName: "Anonymous",
    isAnonymous: true,
    title: "Struggling with anxiety lately",
    content: "Has anyone found effective ways to manage anxiety without medication? I've been trying breathing exercises but looking for more techniques. Thanks for any advice.",
    category: "support",
    tags: ["anxiety", "advice", "breathing"],
    reactions: { heart: 8, hug: 15, star: 2 },
    createdAt: new Date(Date.now() - 7200000), // 2 hours ago
    updatedAt: new Date(Date.now() - 7200000),
  },
];

// Mock Chat Conversations
export const mockMessages: Message[] = [
  {
    id: "msg-1",
    role: "user",
    content: "I'm feeling anxious about an upcoming presentation at work. Can you help me?",
    sentiment: "negative",
    createdAt: new Date(Date.now() - 300000), // 5 minutes ago
  },
  {
    id: "msg-2",
    role: "assistant",
    content: "I understand that presentations can feel overwhelming. Let's work through this together. First, remember that some nervousness is completely normal - it shows you care about doing well. Here are a few techniques that might help:\n\n1. **Deep breathing**: Try the 4-7-8 technique - breathe in for 4, hold for 7, exhale for 8\n2. **Preparation**: The more prepared you feel, the more confident you'll be\n3. **Visualization**: Picture yourself giving a successful presentation\n\nWhat aspect of the presentation worries you most?",
    sentiment: "positive",
    tokens: 87,
    createdAt: new Date(Date.now() - 240000), // 4 minutes ago
  },
  {
    id: "msg-3",
    role: "user",
    content: "I'm worried I'll forget what to say or stumble over my words.",
    sentiment: "negative",
    createdAt: new Date(Date.now() - 120000), // 2 minutes ago
  },
  {
    id: "msg-4",
    role: "assistant",
    content: "Those are very common concerns! Here's what can help:\n\n**For remembering content:**\n- Create bullet point notes (not a script)\n- Practice the key transitions between topics\n- Have a backup 'roadmap' slide\n\n**For speaking clearly:**\n- Practice out loud, not just in your head\n- Slow down - we tend to rush when nervous\n- Pause if you need to collect your thoughts\n\nRemember: Your audience wants you to succeed. They're not looking for perfection, they're there to learn from you. Would you like to practice your opening with me?",
    sentiment: "positive",
    tokens: 94,
    createdAt: new Date(Date.now() - 60000), // 1 minute ago
  },
];

export const mockConversation: Conversation = {
  id: "conv-1",
  userId: "user-1",
  title: "Presentation Anxiety Support",
  sentiment: "mixed",
  messages: mockMessages,
  createdAt: new Date(Date.now() - 300000),
  updatedAt: new Date(Date.now() - 60000),
};

// Mock Analytics
export const mockAnalytics: Analytics = {
  currentStreak: 5,
  longestStreak: 12,
  totalMoodEntries: 47,
  averageMood: 6.8,
  completedChallenges: 3,
  totalPoints: 245,
  weeklyMoodTrend: [
    { date: "Mon", mood: 7 },
    { date: "Tue", mood: 6 },
    { date: "Wed", mood: 8 },
    { date: "Thu", mood: 5 },
    { date: "Fri", mood: 7 },
    { date: "Sat", mood: 9 },
    { date: "Sun", mood: 8 },
  ],
};

// Today's quote
export const todaysQuote = mockQuotes[0];