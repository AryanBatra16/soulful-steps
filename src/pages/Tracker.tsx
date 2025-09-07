import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Calendar as CalendarIcon, TrendingUp, Download, Flame } from "lucide-react";
import { mockMoodEntries, mockAnalytics } from "@/lib/mockData";
import { MOOD_EMOTIONS } from "@/lib/types";
import type { MoodEntry } from "@/lib/types";
import { toast } from "sonner";

export default function Tracker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMood, setSelectedMood] = useState<string>("😊");
  const [moodScore, setMoodScore] = useState<number[]>([7]);
  const [notes, setNotes] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const moodTags = [
    "work", "family", "friends", "exercise", "sleep", "weather",
    "stress", "anxiety", "gratitude", "achievement", "health", "relationships"
  ];

  const handleSaveMood = () => {
    const newEntry: Partial<MoodEntry> = {
      date: selectedDate,
      emoji: selectedMood,
      score: moodScore[0],
      notes,
      tags: selectedTags,
    };

    // In a real app, this would save to a backend
    console.log("Saving mood entry:", newEntry);
    
    toast.success("Mood logged successfully!", {
      description: `${selectedMood} Score: ${moodScore[0]}/10`,
    });
    
    // Reset form
    setNotes("");
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getMoodColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-yellow-500"; 
    if (score >= 4) return "bg-orange-500";
    return "bg-red-500";
  };

  const currentStreak = mockAnalytics.currentStreak;

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-playfair font-bold">Daily Tracker</h1>
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full">
            <Flame className="h-4 w-4" />
            <span className="text-sm font-medium">{currentStreak} day streak!</span>
          </div>
        </div>
        <p className="text-muted-foreground">
          Track your daily mood and build healthy habits with consistent logging.
        </p>
      </div>

      <Tabs defaultValue="log" className="space-y-6">
        <TabsList>
          <TabsTrigger value="log">Log Mood</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Mood Logging */}
        <TabsContent value="log" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle>How are you feeling today?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Emoji Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Choose your mood</label>
                  <div className="grid grid-cols-4 gap-2">
                    {MOOD_EMOTIONS.map((emotion) => (
                      <Button
                        key={emotion.label}
                        variant="outline"
                        size="lg"
                        className={`h-16 flex flex-col gap-1 ${
                          selectedMood === emotion.emoji 
                            ? "border-primary bg-primary/10" 
                            : ""
                        }`}
                        onClick={() => setSelectedMood(emotion.emoji)}
                      >
                        <span className="text-2xl">{emotion.emoji}</span>
                        <span className="text-xs">{emotion.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Mood Score Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Mood intensity</label>
                    <span className="text-sm font-bold text-primary">
                      {moodScore[0]}/10
                    </span>
                  </div>
                  <Slider
                    value={moodScore}
                    onValueChange={setMoodScore}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Very Low</span>
                    <span>Excellent</span>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes (optional)</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What's contributing to your mood today? Any thoughts or events you'd like to remember..."
                    className="min-h-[100px] resize-none"
                    maxLength={300}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {notes.length}/300 characters
                  </p>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {moodTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/20"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSaveMood} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Mood Entry
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {/* Calendar */}
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle className="text-base">Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Today's Summary */}
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Current Streak:</span>
                    <span className="font-bold text-primary">{currentStreak} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Entries:</span>
                    <span className="font-medium">{mockAnalytics.totalMoodEntries}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average Mood:</span>
                    <span className="font-medium">{mockAnalytics.averageMood}/10</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Download className="mr-2 h-3 w-3" />
                    Export Data (CSV)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Calendar Heatmap */}
        <TabsContent value="calendar">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle>Mood Calendar</CardTitle>
              <p className="text-sm text-muted-foreground">
                Visual overview of your mood patterns over time
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Mock calendar grid */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const hasEntry = Math.random() > 0.3;
                  const moodScore = Math.floor(Math.random() * 10) + 1;
                  
                  return (
                    <div
                      key={i}
                      className={`
                        aspect-square rounded-lg border-2 flex items-center justify-center text-sm
                        ${hasEntry 
                          ? `${getMoodColor(moodScore)} text-white border-transparent` 
                          : "border-dashed border-muted-foreground/30"
                        }
                      `}
                    >
                      {i + 1 <= 31 ? i + 1 : ""}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <span>Legend:</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>1-3</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span>4-5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>6-7</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>8-10</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History */}
        <TabsContent value="history">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMoodEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-2xl">{entry.emoji}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {entry.score}/10
                        </Badge>
                      </div>
                      {entry.notes && (
                        <p className="text-sm text-muted-foreground">{entry.notes}</p>
                      )}
                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {entry.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}