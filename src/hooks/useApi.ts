import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchUserProfile,
  fetchUserAnalytics,
  fetchMoodEntries,
  fetchTasks,
  fetchQuotes,
  fetchChallenges,
  fetchCommunityPosts,
  fetchTodaysQuote,
  createMoodEntry,
  updateTask
} from '@/lib/api';
import { MoodEntry, Task } from '@/lib/types';

// User data hooks
export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUserAnalytics() {
  return useQuery({
    queryKey: ['user', 'analytics'],
    queryFn: fetchUserAnalytics,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Mood tracking hooks
export function useMoodEntries() {
  return useQuery({
    queryKey: ['moods'],
    queryFn: fetchMoodEntries,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useCreateMoodEntry() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createMoodEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moods'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'analytics'] });
    },
  });
}

// Task management hooks
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ taskId, updates }: { taskId: string; updates: Partial<Task> }) => 
      updateTask(taskId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// Content hooks
export function useQuotes() {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: fetchQuotes,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useTodaysQuote() {
  return useQuery({
    queryKey: ['quotes', 'today'],
    queryFn: fetchTodaysQuote,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

export function useChallenges() {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallenges,
  });
}

export function useCommunityPosts() {
  return useQuery({
    queryKey: ['community', 'posts'],
    queryFn: fetchCommunityPosts,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}