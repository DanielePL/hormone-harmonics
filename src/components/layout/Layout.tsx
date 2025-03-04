
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Activity, 
  User, 
  Dumbbell, 
  Utensils, 
  HeartPulse, 
  DropletIcon,
  ChartLine,
  CalendarIcon
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Activity className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
    { name: 'Hormones', path: '/hormones', icon: <DropletIcon className="w-5 h-5" /> },
    { name: 'Workouts', path: '/workouts', icon: <Dumbbell className="w-5 h-5" /> },
    { name: 'Nutrition', path: '/nutrition', icon: <Utensils className="w-5 h-5" /> },
    { name: 'Health', path: '/health', icon: <HeartPulse className="w-5 h-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <ChartLine className="w-5 h-5" /> },
    { name: 'Calendar', path: '/calendar', icon: <CalendarIcon className="w-5 h-5" /> },
  ];

  // Skip the layout on the welcome page
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
        <div className="flex flex-col flex-grow bg-card border-r border-border overflow-y-auto">
          <div className="flex items-center justify-center h-16 px-4 border-b border-border">
            <h1 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Hormone Harmonics
            </h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div 
        className={cn(
          "fixed top-0 left-0 right-0 z-10 md:hidden transition-all duration-200",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <h1 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Hormone Harmonics
          </h1>
          <button className="p-2 rounded-md bg-secondary text-foreground">
            <Activity className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-10 md:hidden bg-card border-t border-border">
        <div className="grid grid-cols-5 h-16">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center text-xs font-medium transition-all",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        <main className="flex-1 py-16 md:py-6 px-4 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
