import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Quote, Heart, Shuffle, Share, Calendar, Settings } from "lucide-react";
import { mockQuotes, todaysQuote } from "@/lib/mockData";
import { toast } from "sonner";

const categories = ["All", "Motivation", "Mindfulness", "Gratitude", "Love", "Strength"];

export default function Quotes() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [morningToast, setMorningToast] = useState(true);
  const [reminderInterval, setReminderInterval] = useState(4);

  const handleRandomQuote = () => {
    const randomQuote = mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
    toast(randomQuote.text, {
      description: randomQuote.author ? `— ${randomQuote.author}` : "Anonymous",
      duration: 5000,
    });
  };

  const handleShareQuote = (quote: typeof todaysQuote) => {
    if (navigator.share) {
      navigator.share({
        title: "Inspirational Quote",
        text: `"${quote.text}" ${quote.author ? `— ${quote.author}` : ""}`,
      });
    } else {
      navigator.clipboard.writeText(`"${quote.text}" ${quote.author ? `— ${quote.author}` : ""}`);
      toast.success("Quote copied to clipboard!");
    }
  };

  const filteredQuotes = selectedCategory === "All" 
    ? mockQuotes 
    : mockQuotes.filter(q => q.category === selectedCategory.toLowerCase());

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-playfair font-bold">Daily Quotes</h1>
        <p className="text-muted-foreground">
          Find inspiration and wisdom to brighten your day and nurture your mind.
        </p>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList>
          <TabsTrigger value="today">Today's Quote</TabsTrigger>
          <TabsTrigger value="collection">Quote Collection</TabsTrigger>
          <TabsTrigger value="settings">Preferences</TabsTrigger>
        </TabsList>

        {/* Today's Featured Quote */}
        <TabsContent value="today">
          <Card className="wellness-card">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Quote className="h-8 w-8 text-primary" />
                </div>
                
                <blockquote className="text-xl font-medium leading-relaxed text-foreground max-w-2xl mx-auto">
                  "{todaysQuote.text}"
                </blockquote>
                
                {todaysQuote.author && (
                  <p className="text-lg text-primary font-playfair">
                    — {todaysQuote.author}
                  </p>
                )}

                <div className="flex flex-wrap justify-center gap-2">
                  {todaysQuote.moodTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-center gap-3 pt-4">
                  <Button onClick={handleRandomQuote} variant="outline">
                    <Shuffle className="mr-2 h-4 w-4" />
                    Random Quote
                  </Button>
                  <Button onClick={() => handleShareQuote(todaysQuote)}>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quote Collection */}
        <TabsContent value="collection" className="space-y-6">
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
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quote Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuotes.map((quote) => (
              <Card key={quote.id} className="wellness-card hover:shadow-soft transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <blockquote className="text-sm leading-relaxed text-muted-foreground italic">
                      "{quote.text}"
                    </blockquote>
                    
                    {quote.author && (
                      <p className="text-sm font-medium text-primary">
                        — {quote.author}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {quote.moodTags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleShareQuote(quote)}
                      >
                        <Share className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Daily Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Morning quote toast</p>
                    <p className="text-sm text-muted-foreground">
                      Get a daily quote notification at 8:00 AM
                    </p>
                  </div>
                  <Switch
                    checked={morningToast}
                    onCheckedChange={setMorningToast}
                  />
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Reminder interval</p>
                  <p className="text-sm text-muted-foreground">
                    How often to receive motivational quote reminders
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[2, 4, 8, 12].map((hours) => (
                      <Button
                        key={hours}
                        variant={reminderInterval === hours ? "default" : "outline"}
                        size="sm"
                        onClick={() => setReminderInterval(hours)}
                      >
                        Every {hours}h
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Quote Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Mood-based suggestions</p>
                  <p className="text-sm text-muted-foreground">
                    Receive quotes tailored to your current mood
                  </p>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Favorite categories</p>
                  <p className="text-sm text-muted-foreground">
                    Prioritize quotes from these categories
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.slice(1).map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={category}
                          className="rounded"
                          defaultChecked={category === "Motivation" || category === "Mindfulness"}
                        />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-4">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}