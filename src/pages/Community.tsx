import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, Users, Plus, ThumbsUp, Eye, EyeOff } from "lucide-react";
import { mockPosts } from "@/lib/mockData";
import type { Post } from "@/lib/types";
import { toast } from "sonner";

const categories = ["All", "General", "Support", "Celebration", "Advice"];

export default function Community() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general" as const,
    isAnonymous: false,
    tags: [] as string[],
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    const post: Post = {
      id: `post-${Date.now()}`,
      authorId: "user-1",
      authorName: newPost.isAnonymous ? "Anonymous" : "Sarah Mitchell",
      isAnonymous: newPost.isAnonymous,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      tags: newPost.tags,
      reactions: { heart: 0, hug: 0, star: 0 },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({
      title: "",
      content: "",
      category: "general",
      isAnonymous: false,
      tags: [],
    });
    setIsDialogOpen(false);
    toast.success("Post shared with the community!");
  };

  const handleReaction = (postId: string, reaction: keyof Post["reactions"]) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [reaction]: post.reactions[reaction] + 1,
              },
            }
          : post
      )
    );
  };

  const addTag = (tag: string) => {
    if (tag && !newPost.tags.includes(tag)) {
      setNewPost(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(p => p.category === selectedCategory.toLowerCase());

  const totalPosts = posts.length;
  const myPosts = posts.filter(p => p.authorId === "user-1").length;

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-playfair font-bold">Community</h1>
          <p className="text-muted-foreground">
            Connect, share, and support each other on your wellness journeys.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Share with Community</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What's on your mind?"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts, experiences, or ask for support..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={newPost.category} onValueChange={(value) => 
                    setNewPost(prev => ({ ...prev, category: value as any }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="celebration">Celebration</SelectItem>
                      <SelectItem value="advice">Advice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setNewPost(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
                      className="flex items-center gap-2 text-sm"
                    >
                      {newPost.isAnonymous ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      Post anonymously
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Tags</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag(tagInput.trim());
                      }
                    }}
                  />
                  <Button 
                    type="button"
                    size="sm" 
                    onClick={() => addTag(tagInput.trim())}
                    disabled={!tagInput.trim()}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {newPost.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreatePost} className="flex-1">
                  Share Post
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">1,247</p>
            <p className="text-sm text-muted-foreground">Community Members</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{totalPosts}</p>
            <p className="text-sm text-muted-foreground">Total Posts</p>
          </CardContent>
        </Card>
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{myPosts}</p>
            <p className="text-sm text-muted-foreground">Your Posts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="groups">Support Groups</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts ({myPosts})</TabsTrigger>
        </TabsList>

        {/* Community Feed */}
        <TabsContent value="feed" className="space-y-6">
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

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="wellness-card hover:shadow-soft transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {post.isAnonymous ? "?" : post.authorName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">
                          {post.isAnonymous ? "Anonymous" : post.authorName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString()} • 
                          <Badge variant="outline" className="ml-1 text-xs">
                            {post.category}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-base">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">{post.content}</p>
                  
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleReaction(post.id, "heart")}
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {post.reactions.heart}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleReaction(post.id, "hug")}
                      >
                        🤗 {post.reactions.hug}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Support Groups */}
        <TabsContent value="groups">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Anxiety Support", members: 234, description: "Safe space for anxiety management" },
              { name: "Depression Warriors", members: 189, description: "Supporting each other through tough times" },
              { name: "Mindfulness Circle", members: 312, description: "Daily meditation and mindfulness practice" },
              { name: "New Parents", members: 156, description: "Mental health for new parents" },
              { name: "Workplace Wellness", members: 278, description: "Managing stress and mental health at work" },
              { name: "LGBTQ+ Safe Space", members: 145, description: "Inclusive mental health support" },
            ].map((group) => (
              <Card key={group.name} className="wellness-card hover:shadow-soft transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{group.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {group.members} members
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Posts */}
        <TabsContent value="my-posts">
          <div className="space-y-4">
            {posts.filter(p => p.authorId === "user-1").map((post) => (
              <Card key={post.id} className="wellness-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{post.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Posted {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm leading-relaxed">{post.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {post.reactions.heart + post.reactions.hug + post.reactions.star} reactions
                    </span>
                    <div className="flex gap-4">
                      <span>❤️ {post.reactions.heart}</span>
                      <span>🤗 {post.reactions.hug}</span>
                      <span>⭐ {post.reactions.star}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {posts.filter(p => p.authorId === "user-1").length === 0 && (
              <Card className="wellness-card">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Posts Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Share your first post with the community to connect with others.
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Post
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}