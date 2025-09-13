import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Heart, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { session, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left - Minimal Hamburger Menu */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-9 w-9" />
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-playfair font-semibold text-xl">
            <Heart className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">Mind2Care</span>
          </Link>
        </div>

        {/* Right - Authentication */}
        <div className="flex items-center gap-3">
          {!session ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/auth/sign-up">Sign Up</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={session.avatarUrl} alt={session.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}