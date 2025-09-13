import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, MessageCircle, Trophy, Smile, TrendingUp, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useUserAnalytics, useMoodEntries, useChallenges, useTodaysQuote } from "@/hooks/useApi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { session } = useAuth();
  const { data: analytics, isLoading: analyticsLoading, error: analyticsError } = useUserAnalytics();
  const { data: moodEntries, isLoading: moodLoading } = useMoodEntries();
  const { data: challenges, isLoading: challengesLoading } = useChallenges();
  const { data: todaysQuote, isLoading: quoteLoading } = useTodaysQuote();

  if (!session) {
    return (
      <div className="container mx-auto p-6">
        <EmptyState
          title="Please sign in"
          description="Sign in to view your wellness dashboard"
          action={{ label: "Go to Sign In", onClick: () => window.location.href = "/auth/sign-in" }}
        />
      </div>
    );
  }

  if (analyticsError) {
    return (
      <div className="container mx-auto p-6">
        <ErrorState message="Failed to load dashboard data" />
      </div>
    );
  }

  const todaysMood = moodEntries?.[0];
  const activeChallenge = challenges?.find(c => c.status === "active");
  const firstName = session.name.split(' ')[0];

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-playfair font-bold">Good morning, {firstName}!</h1>
        <p className="text-muted-foreground">Here's how your wellness journey is going today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="wellness-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <Skeleton className="h-8 w-16 mb-2" />
            ) : (
              <div className="text-2xl font-bold text-primary">{analytics?.currentStreak || 0}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Longest: {analytics?.longestStreak || 0} days
            </p>
          </CardContent>
        </Card>

        <Card className="wellness-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <Smile className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <Skeleton className="h-8 w-16 mb-2" />
            ) : (
              <div className="text-2xl font-bold text-primary">{analytics?.averageMood || 0}/10</div>
            )}
            <p className="text-xs text-muted-foreground">
              From {analytics?.totalMoodEntries || 0} entries
            </p>
          </CardContent>
        </Card>

        <Card className="wellness-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <Skeleton className="h-8 w-16 mb-2" />
            ) : (
              <div className="text-2xl font-bold text-primary">{analytics?.totalPoints || 0}</div>
            )}
            <p className="text-xs text-muted-foreground">
              {analytics?.completedChallenges || 0} challenges completed
            </p>
          </CardContent>
        </Card>

        <Card className="wellness-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Mood</CardTitle>
            <div className="text-2xl">{todaysMood?.emoji || "😐"}</div>
          </CardHeader>
          <CardContent>
            {moodLoading ? (
              <Skeleton className="h-8 w-16 mb-2" />
            ) : (
              <div className="text-2xl font-bold text-primary">{todaysMood?.score || "--"}/10</div>
            )}
            <p className="text-xs text-muted-foreground">
              {todaysMood?.notes || "No mood logged yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start your wellness activities for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link to="/tracker">
                <Calendar className="mr-2 h-4 w-4" />
                Log Today's Mood
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start">
              <Link to="/chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with AI Companion
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start">
              <Link to="/challenges">
                <Trophy className="mr-2 h-4 w-4" />
                Browse Challenges
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Active Challenge */}
        {challengesLoading ? (
          <Card className="wellness-card">
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ) : activeChallenge ? (
          <Card className="wellness-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Challenge</CardTitle>
                <Badge variant="secondary">{activeChallenge.category}</Badge>
              </div>
              <CardDescription>{activeChallenge.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {activeChallenge.description}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{activeChallenge.progress}%</span>
                </div>
                <Progress value={activeChallenge.progress} className="h-2" />
              </div>
              <Button asChild className="w-full">
                <Link to="/challenges">Continue Challenge</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="wellness-card">
            <CardContent className="pt-6">
              <EmptyState
                title="No Active Challenge"
                description="Start a new challenge to boost your wellness journey"
                action={{ label: "Browse Challenges", onClick: () => window.location.href = "/challenges" }}
              />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mood Trend Chart */}
        <Card className="wellness-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Mood Trend</CardTitle>
            <CardDescription>Your mood pattern over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics?.weeklyMoodTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    domain={[1, 10]}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Quote of the Day */}
        <Card className="wellness-card">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Quote className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Quote of the Day</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {quoteLoading ? (
              <>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-4 w-24" />
              </>
            ) : todaysQuote ? (
              <>
                <blockquote className="text-sm italic text-muted-foreground leading-relaxed">
                  "{todaysQuote.text}"
                </blockquote>
                {todaysQuote.author && (
                  <p className="text-xs font-medium text-primary">
                    — {todaysQuote.author}
                  </p>
                )}
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/quotes">Browse More Quotes</Link>
                </Button>
              </>
            ) : (
              <EmptyState
                title="No quote available"
                description="Check back later for inspiration"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}