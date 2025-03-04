
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Activity, 
  User, 
  Dumbbell, 
  Utensils, 
  HeartPulse, 
  Droplet as DropletIcon,
  LineChart as ChartLine,
  Calendar as CalendarIcon,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Activity className="w-4 h-4" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-4 h-4" /> },
    { name: 'Hormones', path: '/hormones', icon: <DropletIcon className="w-4 h-4" /> },
    { name: 'Workouts', path: '/workouts', icon: <Dumbbell className="w-4 h-4" /> },
    { name: 'Nutrition', path: '/nutrition', icon: <Utensils className="w-4 h-4" /> },
    { name: 'Health', path: '/health', icon: <HeartPulse className="w-4 h-4" /> },
    { name: 'Analytics', path: '/analytics', icon: <ChartLine className="w-4 h-4" /> },
    { name: 'Calendar', path: '/calendar', icon: <CalendarIcon className="w-4 h-4" /> },
  ];

  // Skip the layout on the welcome page
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex w-60 flex-col fixed inset-y-0">
        <div className="flex flex-col flex-grow bg-card border-r border-border/30 overflow-y-auto shadow-sm">
          <div className="flex items-center justify-center h-16 px-6 border-b border-border/20">
            <h1 className="text-lg font-display font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Hormone Harmonics
            </h1>
          </div>
          <nav className="flex-1 px-3 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary" // More subtle active state
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )}
              >
                <span className={cn(
                  "mr-3 transition-colors",
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div 
        className={cn(
          "fixed top-0 left-0 right-0 z-20 md:hidden transition-all duration-200",
          isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <h1 className="text-lg font-display font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Hormone Harmonics
          </h1>
          <button 
            className="p-2 rounded-full bg-secondary/80 text-foreground"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile side menu (full screen) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-10 bg-background/95 backdrop-blur-sm md:hidden pt-16 pb-20 overflow-y-auto">
          <nav className="px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )}
              >
                <span className={cn(
                  "mr-3 transition-colors",
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-10 md:hidden bg-card/90 backdrop-blur-md border-t border-border/30 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-5 h-16">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center text-[10px] font-medium transition-all pt-1",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {React.cloneElement(item.icon, { 
                className: cn(
                  "w-5 h-5 mb-0.5",
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                )
              })}
              <span className="mt-0.5">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-60">
        <main className="flex-1 py-20 md:py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
