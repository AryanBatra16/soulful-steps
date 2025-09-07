import { z } from "zod";

// User Management
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().optional(),
  preferences: z.object({
    quotesSchedule: z.enum(["morning", "evening", "both", "off"]).default("morning"),
    notifications: z.boolean().default(true),
    theme: z.enum(["light", "dark", "auto"]).default("light"),
    reminderInterval: z.number().default(4), // hours
  }),
  createdAt: z.date().default(() => new Date()),
});

export type User = z.infer<typeof UserSchema>;

// Mood Tracking
export const MoodEntrySchema = z.object({
  id: z.string(),
  userId: z.string(),
  date: z.date(),
  emoji: z.string(),
  score: z.number().min(1).max(10),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.date().default(() => new Date()),
});

export type MoodEntry = z.infer<typeof MoodEntrySchema>;

// Challenges
export const ChallengeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["mindfulness", "gratitude", "movement", "social", "creativity"]),
  duration: z.number(), // days
  points: z.number().default(10),
  status: z.enum(["available", "active", "completed", "paused"]).default("available"),
  startDate: z.date().optional(),
  completedDate: z.date().optional(),
  progress: z.number().min(0).max(100).default(0),
});

export type Challenge = z.infer<typeof ChallengeSchema>;

// Tasks
export const TaskSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  status: z.enum(["today", "this-week", "later", "completed"]).default("today"),
  linkedChallengeId: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  completedAt: z.date().optional(),
});

export type Task = z.infer<typeof TaskSchema>;

// Quotes
export const QuoteSchema = z.object({
  id: z.string(),
  text: z.string(),
  author: z.string().optional(),
  category: z.string().default("motivation"),
  moodTags: z.array(z.string()).default([]),
  scheduledAt: z.date().optional(),
  isDaily: z.boolean().default(false),
});

export type Quote = z.infer<typeof QuoteSchema>;

// Community Posts
export const PostSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  authorName: z.string(),
  isAnonymous: z.boolean().default(false),
  title: z.string(),
  content: z.string(),
  category: z.enum(["general", "support", "celebration", "advice"]).default("general"),
  tags: z.array(z.string()).default([]),
  reactions: z.object({
    heart: z.number().default(0),
    hug: z.number().default(0),
    star: z.number().default(0),
  }),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type Post = z.infer<typeof PostSchema>;

// Chat Conversations
export const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  tokens: z.number().optional(),
  sentiment: z.enum(["positive", "neutral", "negative"]).optional(),
  createdAt: z.date().default(() => new Date()),
});

export const ConversationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  sentiment: z.enum(["positive", "neutral", "negative", "mixed"]).default("neutral"),
  messages: z.array(MessageSchema).default([]),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type Message = z.infer<typeof MessageSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;

// Dashboard Analytics
export const AnalyticsSchema = z.object({
  currentStreak: z.number().default(0),
  longestStreak: z.number().default(0),
  totalMoodEntries: z.number().default(0),
  averageMood: z.number().default(0),
  completedChallenges: z.number().default(0),
  totalPoints: z.number().default(0),
  weeklyMoodTrend: z.array(z.object({
    date: z.string(),
    mood: z.number(),
  })).default([]),
});

export type Analytics = z.infer<typeof AnalyticsSchema>;

// Mood emotions for classification
export const MOOD_EMOTIONS = [
  { emoji: "😊", label: "Happy", value: 8, color: "mood-joy" },
  { emoji: "😌", label: "Calm", value: 7, color: "mood-calm" },
  { emoji: "😐", label: "Neutral", value: 5, color: "mood-neutral" },
  { emoji: "😔", label: "Sad", value: 3, color: "mood-sad" },
  { emoji: "😰", label: "Anxious", value: 4, color: "mood-anxious" },
  { emoji: "😡", label: "Angry", value: 2, color: "mood-angry" },
  { emoji: "🤗", label: "Grateful", value: 9, color: "mood-joy" },
  { emoji: "😴", label: "Tired", value: 4, color: "mood-neutral" },
] as const;