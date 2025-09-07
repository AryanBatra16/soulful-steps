// Update this page (the content is just a fallback if you fail to update the page)

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowRight, Users, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-8 w-8 text-primary" />
          <span className="text-2xl font-playfair font-bold">Mind2Care</span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" asChild>
            <Link to="/auth/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/sign-up">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-playfair font-bold leading-tight">
            Your Journey to <span className="text-primary">Mental Wellness</span> Starts Here
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your moods, build healthy habits, and connect with a supportive community. 
            Mind2Care provides the tools you need for better mental health.
          </p>
          <div className="flex gap-4 justify-center pt-6">
            <Button size="lg" asChild>
              <Link to="/auth/sign-up">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboard">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-4">Everything You Need for Wellness</h2>
          <p className="text-muted-foreground">Comprehensive tools designed by mental health experts</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Mood Tracking",
              description: "Log and analyze your emotions with beautiful visualizations and insights"
            },
            {
              icon: Users,
              title: "Community Support", 
              description: "Connect with others on similar journeys in a safe, supportive environment"
            },
            {
              icon: Zap,
              title: "AI Companion",
              description: "Get personalized guidance and support from our wellness-focused AI"
            }
          ].map((feature, index) => (
            <Card key={index} className="wellness-card hover:shadow-soft transition-shadow">
              <CardHeader className="text-center">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="wellness-card max-w-2xl mx-auto">
          <CardContent className="p-8">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-playfair font-bold mb-4">Your Privacy Matters</h3>
            <p className="text-muted-foreground mb-6">
              All your data is encrypted and secure. We never share your personal information, 
              and you maintain full control over your wellness journey.
            </p>
            <Button size="lg" asChild>
              <Link to="/auth/sign-up">Start Today - It's Free</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
