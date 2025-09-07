import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Smile, Calendar, MessageCircle, Target, Brain } from "lucide-react";
import { mockMoodEntries, mockAnalytics } from "@/lib/mockData";
import { MOOD_EMOTIONS } from "@/lib/types";
import { Link } from "react-router-dom";

const moodColors = {
  "😊": "#22c55e", // green
  "😌": "#3b82f6", // blue  
  "😐": "#6b7280", // gray
  "😔": "#8b5cf6", // purple
  "😰": "#f97316", // orange
  "😡": "#ef4444", // red
  "🤗": "#eab308", // yellow
  "😴": "#64748b", // slate
};

export default function Moods() {
  const [timeRange, setTimeRange] = useState("7days");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Mock data for different time ranges
  const mockWeeklyData = [
    { day: "Mon", mood: 7, emoji: "😊" },
    { day: "Tue", mood: 5, emoji: "😐" },
    { day: "Wed", mood: 8, emoji: "😊" },
    { day: "Thu", mood: 4, emoji: "😔" },
    { day: "Fri", mood: 6, emoji: "😌" },
    { day: "Sat", mood: 9, emoji: "🤗" },
    { day: "Sun", mood: 7, emoji: "😊" },
  ];

  const moodDistribution = MOOD_EMOTIONS.map(emotion => ({
    emoji: emotion.emoji,
    label: emotion.label,
    count: Math.floor(Math.random() * 15) + 1,
    percentage: Math.floor(Math.random() * 30) + 5,
  }));

  const topTriggers = [
    { tag: "work", count: 12, sentiment: "negative" },
    { tag: "exercise", count: 8, sentiment: "positive" },
    { tag: "sleep", count: 7, sentiment: "negative" },
    { tag: "meditation", count: 6, sentiment: "positive" },
    { tag: "family", count: 5, sentiment: "positive" },
    { tag: "stress", count: 4, sentiment: "negative" },
  ];

  const moodInsights = [
    {
      title: "Best Days",
      content: "You tend to feel better on weekends and Wednesdays",
      icon: "📈",
    },
    {
      title: "Common Triggers",
      content: "Work stress and poor sleep affect your mood most",
      icon: "⚠️",
    },
    {
      title: "Mood Boosters",
      content: "Exercise and meditation consistently improve your mood", 
      icon: "✨",
    },
    {
      title: "Pattern Alert",
      content: "Your mood dips on Monday and Thursday evenings",
      icon: "🔄",
    },
  ];

  const currentStreak = mockAnalytics.currentStreak;
  const averageMood = mockAnalytics.averageMood;

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-playfair font-bold">Mood Analytics</h1>
        <p className="text-muted-foreground">
          Discover patterns and insights in your emotional wellbeing over time.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{averageMood.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">Average Mood</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{currentStreak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Smile className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{mockAnalytics.totalMoodEntries}</p>
            <p className="text-sm text-muted-foreground">Total Entries</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">85%</p>
            <p className="text-sm text-muted-foreground">Goal Progress</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="triggers">Triggers</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Mood Trends */}
        <TabsContent value="trends" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Mood Trends Over Time</h2>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
                <SelectItem value="90days">90 Days</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle>Daily Mood Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockWeeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" fontSize={12} />
                    <YAxis domain={[1, 10]} fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value, name) => [
                        `${value}/10`,
                        'Mood Score'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="wellness-card">
              <CardHeader>
                <CardTitle>Mood Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={moodDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="percentage"
                      label={({ emoji, percentage }) => `${emoji} ${percentage}%`}
                    >
                      {moodDistribution.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={moodColors[entry.emoji as keyof typeof moodColors] || "#8884d8"} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Mood Patterns */}
        <TabsContent value="patterns" className="space-y-6">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle>Weekly Mood Patterns</CardTitle>
              <p className="text-sm text-muted-foreground">
                How your mood varies throughout the week
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" fontSize={12} />
                  <YAxis domain={[1, 10]} fontSize={12} />
                  <Tooltip />
                  <Bar 
                    dataKey="mood" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-base">Time of Day Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { time: "Morning (6-12)", mood: 7.2, color: "bg-yellow-500" },
                  { time: "Afternoon (12-6)", mood: 6.8, color: "bg-orange-500" },
                  { time: "Evening (6-10)", mood: 6.1, color: "bg-blue-500" },
                  { time: "Night (10-6)", mood: 5.9, color: "bg-purple-500" },
                ].map((period) => (
                  <div key={period.time} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${period.color}`} />
                      <span className="text-sm">{period.time}</span>
                    </div>
                    <span className="text-sm font-medium">{period.mood}/10</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-base">Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { month: "January", trend: "↗️ Improving", change: "+0.8" },
                  { month: "February", trend: "➡️ Stable", change: "+0.1" },
                  { month: "March", trend: "↗️ Improving", change: "+0.5" },
                  { month: "April", trend: "↘️ Declining", change: "-0.3" },
                ].map((month) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-sm">{month.month}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{month.trend}</span>
                      <Badge variant={month.change.startsWith('+') ? "default" : "destructive"}>
                        {month.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Mood Triggers */}
        <TabsContent value="triggers" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle>Top Mood Triggers</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Factors that most commonly affect your mood
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {topTriggers.map((trigger) => (
                  <div key={trigger.tag} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={trigger.sentiment === "positive" ? "default" : "destructive"}
                        className="w-2 h-2 p-0 rounded-full"
                      />
                      <span className="text-sm capitalize">{trigger.tag}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{trigger.count} mentions</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="wellness-card">
              <CardHeader>
                <CardTitle>Mood Correlation</CardTitle>
                <p className="text-sm text-muted-foreground">
                  How different activities affect your mood
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { activity: "Exercise", correlation: "+2.1", color: "text-green-600" },
                  { activity: "Meditation", correlation: "+1.8", color: "text-green-600" },
                  { activity: "Social time", correlation: "+1.4", color: "text-green-600" },
                  { activity: "Work stress", correlation: "-1.9", color: "text-red-600" },
                  { activity: "Poor sleep", correlation: "-1.6", color: "text-red-600" },
                  { activity: "Caffeine", correlation: "-0.3", color: "text-orange-600" },
                ].map((item) => (
                  <div key={item.activity} className="flex items-center justify-between">
                    <span className="text-sm">{item.activity}</span>
                    <span className={`text-sm font-medium ${item.color}`}>
                      {item.correlation}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Get Personalized Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your mood patterns, our AI companion can provide targeted suggestions 
                for managing triggers and improving your overall wellbeing.
              </p>
              <Button asChild>
                <Link to="/chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat About My Mood Patterns
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {moodInsights.map((insight, index) => (
              <Card key={index} className="wellness-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="text-2xl">{insight.icon}</span>
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{insight.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Based on your patterns, try:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Schedule workouts on Monday/Thursday evenings</li>
                    <li>• Practice meditation before work on stressful days</li>
                    <li>• Set a consistent sleep schedule</li>
                    <li>• Take short breaks during busy work periods</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Warning signs to watch for:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 3+ consecutive days below 5/10</li>
                    <li>• Increased work stress mentions</li>
                    <li>• Skipping exercise for 5+ days</li>
                    <li>• Sleep quality declining</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button asChild>
                  <Link to="/chat">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Discuss Insights
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/challenges">
                    <Target className="mr-2 h-4 w-4" />
                    Set Mood Goals
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}