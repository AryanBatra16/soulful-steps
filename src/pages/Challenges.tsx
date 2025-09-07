import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Play, CheckCircle2, Clock, Users, Target, Star } from "lucide-react";
import { mockChallenges } from "@/lib/mockData";
import type { Challenge } from "@/lib/types";
import { toast } from "sonner";

const categoryIcons = {
  mindfulness: "🧘",
  gratitude: "🙏", 
  movement: "🏃",
  social: "👥",
  creativity: "🎨",
};

const categoryColors = {
  mindfulness: "bg-blue-100 text-blue-800",
  gratitude: "bg-green-100 text-green-800",
  movement: "bg-orange-100 text-orange-800", 
  social: "bg-purple-100 text-purple-800",
  creativity: "bg-pink-100 text-pink-800",
};

export default function Challenges() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);

  const handleStartChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, status: "active" as const, startDate: new Date(), progress: 0 }
          : challenge
      )
    );
    
    const challenge = challenges.find(c => c.id === challengeId);
    toast.success(`Started: ${challenge?.title}`, {
      description: `${challenge?.duration} day challenge begins now!`,
    });
  };

  const handleCompleteChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, status: "completed" as const, completedDate: new Date(), progress: 100 }
          : challenge
      )
    );
    
    const challenge = challenges.find(c => c.id === challengeId);
    toast.success(`Completed: ${challenge?.title}`, {
      description: `+${challenge?.points} points earned! 🎉`,
    });
  };

  const categories = ["All", "Mindfulness", "Gratitude", "Movement", "Social", "Creativity"];
  
  const filteredChallenges = selectedCategory === "All" 
    ? challenges 
    : challenges.filter(c => c.category === selectedCategory.toLowerCase());

  const availableChallenges = filteredChallenges.filter(c => c.status === "available");
  const activeChallenges = filteredChallenges.filter(c => c.status === "active");
  const completedChallenges = filteredChallenges.filter(c => c.status === "completed");

  const totalPoints = challenges
    .filter(c => c.status === "completed")
    .reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-playfair font-bold">Wellness Challenges</h1>
        <p className="text-muted-foreground">
          Build healthy habits through fun, achievable challenges designed to boost your wellbeing.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{totalPoints}</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Play className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{activeChallenges.length}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{completedChallenges.length}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{availableChallenges.length}</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card className="wellness-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category !== "All" && categoryIcons[category.toLowerCase() as keyof typeof categoryIcons]}
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active ({activeChallenges.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableChallenges.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedChallenges.length})</TabsTrigger>
        </TabsList>

        {/* Active Challenges */}
        <TabsContent value="active">
          {activeChallenges.length === 0 ? (
            <Card className="wellness-card">
              <CardContent className="p-8 text-center">
                <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Active Challenges</h3>
                <p className="text-muted-foreground mb-4">
                  Start your wellness journey by choosing a challenge from the available list.
                </p>
                <Button onClick={() => setSelectedCategory("All")}>
                  Browse Available Challenges
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {activeChallenges.map((challenge) => (
                <Card key={challenge.id} className="wellness-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {categoryIcons[challenge.category]}
                        </span>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      </div>
                      <Badge className={categoryColors[challenge.category]}>
                        {challenge.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="font-medium">{challenge.duration}</p>
                        <p className="text-xs text-muted-foreground">days</p>
                      </div>
                      <div>
                        <Star className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="font-medium">{challenge.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                      <div>
                        <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="font-medium">1.2k</p>
                        <p className="text-xs text-muted-foreground">joined</p>
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => handleCompleteChallenge(challenge.id)}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Mark as Complete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Available Challenges */}
        <TabsContent value="available">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableChallenges.map((challenge) => (
              <Card key={challenge.id} className="wellness-card hover:shadow-soft transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {categoryIcons[challenge.category]}
                      </span>
                      <CardTitle className="text-base">{challenge.title}</CardTitle>
                    </div>
                    <Badge className={categoryColors[challenge.category]}>
                      {challenge.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="font-medium">{challenge.duration}</p>
                      <p className="text-xs text-muted-foreground">days</p>
                    </div>
                    <div>
                      <Star className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="font-medium">{challenge.points}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                    <div>
                      <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="font-medium">{Math.floor(Math.random() * 2000 + 500)}</p>
                      <p className="text-xs text-muted-foreground">joined</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => handleStartChallenge(challenge.id)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Challenges */}
        <TabsContent value="completed">
          {completedChallenges.length === 0 ? (
            <Card className="wellness-card">
              <CardContent className="p-8 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Completed Challenges Yet</h3>
                <p className="text-muted-foreground">
                  Complete your first challenge to see your achievements here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedChallenges.map((challenge) => (
                <Card key={challenge.id} className="wellness-card border-green-200 bg-green-50/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {categoryIcons[challenge.category]}
                        </span>
                        <CardTitle className="text-base">{challenge.title}</CardTitle>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span>Completed:</span>
                      <span className="font-medium">
                        {challenge.completedDate?.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span>Points Earned:</span>
                      <Badge variant="secondary" className="text-green-700 bg-green-100">
                        +{challenge.points} points
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}