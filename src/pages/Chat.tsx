import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Heart, AlertCircle } from "lucide-react";
import { mockConversation, mockMessages } from "@/lib/mockData";
import type { Message } from "@/lib/types";

const quickReplies = [
  "I'm feeling anxious",
  "I need motivation",
  "Help with stress",
  "Feeling overwhelmed",
  "I'm grateful for...",
  "Sleep troubles",
];

const sentimentColors = {
  positive: "bg-green-100 text-green-800",
  neutral: "bg-gray-100 text-gray-800", 
  negative: "bg-orange-100 text-orange-800",
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      sentiment: "neutral",
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg-${Date.now()}-ai`,
        role: "assistant", 
        content: "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me a bit more about what you're experiencing right now? Sometimes it helps to talk through our feelings step by step.",
        sentiment: "positive",
        tokens: 45,
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl animate-fade-in">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-playfair font-bold">AI Wellness Companion</h1>
        <p className="text-muted-foreground">
          A safe space to share your thoughts and feelings. I'm here to listen and provide gentle guidance.
        </p>
        
        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-orange-800">
            <strong>Important:</strong> This AI companion provides emotional support and wellness tips, 
            but is not a substitute for professional mental health care. If you're experiencing a crisis, 
            please contact emergency services or a mental health professional.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat Interface */}
        <Card className="wellness-card lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Chat Session
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {mockConversation.sentiment} tone
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages */}
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10">
                          <Bot className="h-4 w-4 text-primary" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        {message.tokens && (
                          <span>{message.tokens} tokens</span>
                        )}
                      </div>
                    </div>

                    {message.role === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-2xl p-3 max-w-[80%]">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            <Separator />

            {/* Quick Replies */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Quick replies:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs h-7"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share what's on your mind..."
                className="min-h-[60px] resize-none"
                maxLength={500}
              />
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{input.length}/500 characters</span>
              <span>Press Shift+Enter for new line</span>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Session Info */}
          <Card className="wellness-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Session Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Messages:</span>
                <span className="font-medium">{messages.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tokens used:</span>
                <span className="font-medium">
                  {messages.reduce((sum, msg) => sum + (msg.tokens || 0), 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Session tone:</span>
                <Badge 
                  className={`text-xs ${
                    sentimentColors[mockConversation.sentiment] || sentimentColors.neutral
                  }`}
                >
                  {mockConversation.sentiment}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Mood Check */}
          <Card className="wellness-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">How are you feeling?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { emoji: "😊", label: "Happy" },
                  { emoji: "😌", label: "Calm" },
                  { emoji: "😔", label: "Sad" },
                  { emoji: "😰", label: "Anxious" },
                ].map((mood) => (
                  <Button
                    key={mood.label}
                    variant="outline"
                    size="sm"
                    className="flex flex-col gap-1 h-12"
                  >
                    <span className="text-lg">{mood.emoji}</span>
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Crisis Resources */}
          <Card className="wellness-card border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Crisis Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-muted-foreground mb-3">
                If you're in crisis, reach out immediately:
              </p>
              <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                <a href="tel:988">Crisis Lifeline: 988</a>
              </Button>
              <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                <a href="https://www.crisistextline.org" target="_blank" rel="noopener">
                  Text HOME to 741741
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}