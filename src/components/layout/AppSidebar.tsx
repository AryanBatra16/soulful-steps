import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageCircle,
  Calendar,
  Quote,
  Trophy,
  CheckSquare,
  Users,
  Smile,
  TrendingUp,
  Settings,
  Heart,
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview and quick actions"
  },
  {
    title: "AI Chatbot",
    url: "/chat",
    icon: MessageCircle,
    description: "Talk with your wellness companion"
  },
  {
    title: "Daily Tracker",
    url: "/tracker",
    icon: Calendar,
    description: "Log moods and track streaks"
  },
  {
    title: "Quotes",
    url: "/quotes",
    icon: Quote,
    description: "Inspirational daily quotes"
  },
  {
    title: "Challenges",
    url: "/challenges",
    icon: Trophy,
    description: "Wellness challenges and goals"
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: CheckSquare,
    description: "Manage your wellness tasks"
  },
  {
    title: "Community",
    url: "/community",
    icon: Users,
    description: "Connect with others"
  },
  {
    title: "Moods",
    url: "/moods",
    icon: Smile,
    description: "Mood analytics and insights"
  },
  {
    title: "Growth Map",
    url: "/growth",
    icon: TrendingUp,
    description: "Track your wellness journey"
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "Preferences and account"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="pt-6">
        {/* Brand */}
        {!isCollapsed && (
          <div className="px-6 pb-4">
            <div className="flex items-center gap-2 font-playfair font-semibold text-lg">
              <Heart className="h-5 w-5 text-primary" />
              <span>Mind2Care</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your wellness companion
            </p>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`
                      transition-all duration-200 hover:bg-primary/10 
                      ${isActive(item.url) 
                        ? "bg-primary/15 text-primary font-medium border-r-2 border-primary" 
                        : "hover:bg-accent/50"
                      }
                    `}
                  >
                    <Link to={item.url} className="flex items-center gap-3 p-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}