import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Star, Target, TrendingUp, Award, Share, Download, Calendar } from "lucide-react";
import { mockAnalytics, mockChallenges } from "@/lib/mockData";

const milestones = [
  {
    id: 1,
    title: "First Steps",
    description: "Logged your first mood entry",
    icon: "🌱",
    completed: true,
    date: "March 1, 2024",
    points: 10,
  },
  {
    id: 2,
    title: "Weekly Warrior",
    description: "Maintained a 7-day logging streak",
    icon: "⚡",
    completed: true,
    date: "March 8, 2024", 
    points: 25,
  },
  {
    id: 3,
    title: "Challenge Accepted",
    description: "Completed your first wellness challenge",
    icon: "🏆",
    completed: true,
    date: "March 15, 2024",
    points: 50,
  },
  {
    id: 4,
    title: "Community Helper",
    description: "Shared support in the community",
    icon: "🤝",
    completed: true,
    date: "March 20, 2024",
    points: 30,
  },
  {
    id: 5,
    title: "Mindfulness Master",
    description: "Complete 30 meditation sessions",
    icon: "🧘",
    completed: false,
    progress: 65,
    points: 100,
  },
  {
    id: 6,
    title: "Month of Growth",
    description: "Log mood for 30 consecutive days",
    icon: "📅",
    completed: false,
    progress: 83,
    points: 75,
  },
];

const badges = [
  { id: 1, name: "Early Bird", description: "Log mood before 8 AM", icon: "🌅", earned: true },
  { id: 2, name: "Consistency King", description: "7-day streak", icon: "👑", earned: true },
  { id: 3, name: "Mood Explorer", description: "Used all mood types", icon: "🗺️", earned: true },
  { id: 4, name: "Community Star", description: "5+ helpful posts", icon: "⭐", earned: false },
  { id: 5, name: "Challenge Champion", description: "Complete 5 challenges", icon: "🏅", earned: false },
  { id: 6, name: "Wellness Wizard", description: "100 points earned", icon: "🪄", earned: true },
];

const stats = {
  totalPoints: mockAnalytics.totalPoints,
  completedChallenges: mockAnalytics.completedChallenges,
  currentStreak: mockAnalytics.currentStreak,
  longestStreak: mockAnalytics.longestStreak,
  rank: "Rising Star",
  percentile: 78,
};

export default function Growth() {
  const completedMilestones = milestones.filter(m => m.completed);
  const activeMilestones = milestones.filter(m => !m.completed);
  const earnedBadges = badges.filter(b => b.earned);

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-playfair font-bold">Growth Journey</h1>
        <p className="text-muted-foreground">
          Track your wellness progress and celebrate your achievements along the way.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{stats.totalPoints}</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{earnedBadges.length}</p>
            <p className="text-sm text-muted-foreground">Badges Earned</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{completedMilestones.length}</p>
            <p className="text-sm text-muted-foreground">Milestones</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.percentile}%</p>
            <p className="text-sm text-muted-foreground">Top Percentile</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="progress">Progress Tree</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Your Wellness Rank
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <h3 className="text-xl font-bold">{stats.rank}</h3>
                  <p className="text-sm text-muted-foreground">
                    You're in the top {100 - stats.percentile}% of users!
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress to next rank:</span>
                    <span className="font-medium">175/250 points</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    75 more points to reach "Wellness Warrior" 🏆
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="wellness-card">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {completedMilestones.slice(-3).map((milestone) => (
                  <div key={milestone.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-2xl">{milestone.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{milestone.title}</p>
                      <p className="text-xs text-muted-foreground">{milestone.date}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      +{milestone.points}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="wellness-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Share Your Progress</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-card p-6 rounded-2xl border-2 border-primary/20">
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-playfair font-bold">My Wellness Journey</h3>
                  <div className="flex justify-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{stats.totalPoints}</p>
                      <p className="text-muted-foreground">Points</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{stats.currentStreak}</p>
                      <p className="text-muted-foreground">Day Streak</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{earnedBadges.length}</p>
                      <p className="text-muted-foreground">Badges</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Powered by Mind2Care • Building wellness habits since March 2024
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Milestones */}
        <TabsContent value="milestones" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Active Milestones */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">In Progress</h2>
              {activeMilestones.map((milestone) => (
                <Card key={milestone.id} className="wellness-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{milestone.icon}</span>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{milestone.title}</h3>
                          <Badge variant="outline">+{milestone.points}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {milestone.description}
                        </p>
                        {milestone.progress && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{milestone.progress}%</span>
                            </div>
                            <Progress value={milestone.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Completed Milestones */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Completed</h2>
              {completedMilestones.map((milestone) => (
                <Card key={milestone.id} className="wellness-card border-green-200 bg-green-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{milestone.icon}</span>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{milestone.title}</h3>
                          <Badge className="bg-green-100 text-green-800">
                            +{milestone.points}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {milestone.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Completed {milestone.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Badges */}
        <TabsContent value="badges" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => (
              <Card 
                key={badge.id} 
                className={`wellness-card ${
                  badge.earned 
                    ? 'border-yellow-200 bg-yellow-50/50' 
                    : 'opacity-60'
                }`}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h3 className="font-medium mb-1">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {badge.description}
                  </p>
                  {badge.earned ? (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Earned
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      Locked
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Progress Tree */}
        <TabsContent value="progress">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Your Wellness Journey
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Visual timeline of your progress and growth milestones
              </p>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Growth Tree Visualization */}
                <div className="flex flex-col space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex items-center gap-4">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center text-xl
                        ${milestone.completed 
                          ? 'bg-green-100 border-2 border-green-500' 
                          : 'bg-gray-100 border-2 border-gray-300'
                        }
                      `}>
                        {milestone.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`font-medium ${
                              milestone.completed ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {milestone.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {milestone.description}
                            </p>
                            {milestone.completed && milestone.date && (
                              <p className="text-xs text-green-600 mt-1">
                                ✓ Completed {milestone.date}
                              </p>
                            )}
                          </div>
                          
                          <Badge 
                            variant={milestone.completed ? "default" : "outline"}
                            className={milestone.completed ? "bg-green-100 text-green-800" : ""}
                          >
                            {milestone.points} pts
                          </Badge>
                        </div>
                        
                        {milestone.progress && !milestone.completed && (
                          <div className="mt-2">
                            <Progress value={milestone.progress} className="h-1" />
                            <p className="text-xs text-muted-foreground mt-1">
                              {milestone.progress}% complete
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {index < milestones.length - 1 && (
                        <div className="absolute left-6 mt-12 w-0.5 h-6 bg-gray-200" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}