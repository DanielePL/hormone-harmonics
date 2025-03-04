
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCard from '@/components/ui/AnimatedCard';
import InsightPanel from '@/components/ui/InsightPanel';
import { 
  HeartPulse, 
  Activity, 
  Dumbbell, 
  DropletIcon, 
  UtensilsIcon,
  ChartLine,
  ChartBarIcon,
  CalendarIcon
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const hormoneData = [
  { day: '1', estrogen: 100, progesterone: 5, testosterone: 40, cortisol: 15 },
  { day: '7', estrogen: 120, progesterone: 10, testosterone: 38, cortisol: 14 },
  { day: '14', estrogen: 300, progesterone: 15, testosterone: 35, cortisol: 18 },
  { day: '21', estrogen: 150, progesterone: 90, testosterone: 37, cortisol: 13 },
  { day: '28', estrogen: 95, progesterone: 20, testosterone: 39, cortisol: 16 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Your personalized hormone and health insights.</p>
        </div>
        <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors self-start">
          <span className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>Log Today</span>
          </span>
        </button>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatedCard delay={100}>
          <InsightPanel
            type="low"
            title="Progesterone levels are below optimal range"
            description="Consider adding more magnesium-rich foods like dark chocolate, avocados, and nuts to support progesterone production."
          />
        </AnimatedCard>
        <AnimatedCard delay={200}>
          <InsightPanel
            type="optimal"
            title="Your protein intake is on target"
            description="Great job maintaining adequate protein! This supports muscle recovery and metabolic health during hormonal changes."
          />
        </AnimatedCard>
        <AnimatedCard delay={300}>
          <InsightPanel
            type="high"
            title="Cortisol levels appear elevated"
            description="Your recent workout intensity may be too high. Consider reducing HIIT sessions and adding more Zone 2 cardio this week."
          />
        </AnimatedCard>
        <AnimatedCard delay={400}>
          <InsightPanel
            type="info"
            title="Perimenopause transition detected"
            description="Based on your recent hormone patterns, you may be entering perimenopause. We've adjusted your recommendations accordingly."
          />
        </AnimatedCard>
      </div>

      {/* Hormone Chart */}
      <AnimatedCard delay={100}>
        <GlassCard className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
            <h2 className="text-xl font-semibold">Hormone Trends</h2>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-hormone-estrogen"></div>
                <span className="text-xs text-muted-foreground">Estrogen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-hormone-progesterone"></div>
                <span className="text-xs text-muted-foreground">Progesterone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-hormone-testosterone"></div>
                <span className="text-xs text-muted-foreground">Testosterone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-hormone-cortisol"></div>
                <span className="text-xs text-muted-foreground">Cortisol</span>
              </div>
            </div>
          </div>
          <div className="h-56 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hormoneData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: 'none'
                  }} 
                />
                <Line type="monotone" dataKey="estrogen" stroke="#FF84B1" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="progesterone" stroke="#AD8CEB" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="testosterone" stroke="#6AC1FF" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="cortisol" stroke="#FFA451" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </AnimatedCard>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <AnimatedCard delay={200}>
          <Card className="card-hover">
            <CardHeader className="pb-2 p-3 md:p-4">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <DropletIcon className="w-4 h-4 text-hormone-estrogen" />
                Hormone Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <p className="text-xs md:text-sm text-muted-foreground">Log and monitor your hormone levels and symptoms</p>
            </CardContent>
          </Card>
        </AnimatedCard>
        
        <AnimatedCard delay={300}>
          <Card className="card-hover">
            <CardHeader className="pb-2 p-3 md:p-4">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-hormone-testosterone" />
                Workout Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <p className="text-xs md:text-sm text-muted-foreground">Custom workouts based on your hormonal phase</p>
            </CardContent>
          </Card>
        </AnimatedCard>
        
        <AnimatedCard delay={400}>
          <Card className="card-hover">
            <CardHeader className="pb-2 p-3 md:p-4">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <UtensilsIcon className="w-4 h-4 text-hormone-progesterone" />
                Nutrition Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <p className="text-xs md:text-sm text-muted-foreground">Foods that support your hormonal balance</p>
            </CardContent>
          </Card>
        </AnimatedCard>
        
        <AnimatedCard delay={500}>
          <Card className="card-hover">
            <CardHeader className="pb-2 p-3 md:p-4">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-hormone-cortisol" />
                Recovery Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <p className="text-xs md:text-sm text-muted-foreground">Sleep, HRV, and stress management tools</p>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatedCard delay={200} className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Weekly Progress</CardTitle>
              <CardDescription>Activity summary for the past 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Strength Training</span>
                </div>
                <span className="text-sm">3 of 4 sessions completed</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Zone 2 Cardio</span>
                </div>
                <span className="text-sm">120 of 150 minutes</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <UtensilsIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Protein Target</span>
                </div>
                <span className="text-sm">93% achieved</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '93%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DropletIcon className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Hormone-Supporting Foods</span>
                </div>
                <span className="text-sm">12 of 15 servings</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
        
        <AnimatedCard delay={300}>
          <Card>
            <CardHeader>
              <CardTitle>Today's Plan</CardTitle>
              <CardDescription>Personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Dumbbell className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Upper Body Strength</span>
                </div>
                <p className="text-xs text-muted-foreground">Focus on pull movements with moderate intensity (RPE 7-8)</p>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <UtensilsIcon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Nutrition Focus</span>
                </div>
                <p className="text-xs text-muted-foreground">Increase magnesium & zinc rich foods today to support progesterone</p>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <HeartPulse className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Recovery</span>
                </div>
                <p className="text-xs text-muted-foreground">Schedule 15 min deep breathing to reduce cortisol levels</p>
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default Dashboard;
