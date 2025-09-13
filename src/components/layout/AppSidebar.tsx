import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
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
  SidebarFooter,
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
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Chatbot",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Daily Tracker",
    url: "/tracker",
    icon: Calendar,
  },
  {
    title: "Quotes",
    url: "/quotes",
    icon: Quote,
  },
  {
    title: "Challenges",
    url: "/challenges",
    icon: Trophy,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Community",
    url: "/community",
    icon: Users,
  },
  {
    title: "Moods",
    url: "/moods",
    icon: Smile,
  },
  {
    title: "Growth Map",
    url: "/growth",
    icon: TrendingUp,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { session, signOut } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="pt-6">
        {/* Minimal Brand */}
        {!isCollapsed && (
          <div className="px-6 pb-4">
            <div className="flex items-center gap-2 font-playfair font-semibold text-lg">
              <Heart className="h-5 w-5 text-primary" />
              <span>Mind2Care</span>
            </div>
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
                        <span className="text-sm font-medium">{item.title}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user info */}
      {session && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/settings" className="flex items-center gap-3 p-3">
                  <Settings className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm">Settings</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {!isCollapsed && (
              <SidebarMenuItem>
                <div className="flex items-center gap-3 p-3 border-t">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.avatarUrl} />
                    <AvatarFallback className="text-xs">
                      {session.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{session.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.email}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={signOut}
                    className="h-8 w-8 p-0"
                  >
                    <LogOut className="h-3 w-3" />
                  </Button>
                </div>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}