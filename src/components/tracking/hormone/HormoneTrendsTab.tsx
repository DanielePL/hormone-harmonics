
import React from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const hormoneData = [
  { date: 'Jan 01', estrogen: 100, progesterone: 5, testosterone: 40, cortisol: 15 },
  { date: 'Jan 07', estrogen: 120, progesterone: 10, testosterone: 38, cortisol: 14 },
  { date: 'Jan 14', estrogen: 300, progesterone: 15, testosterone: 35, cortisol: 18 },
  { date: 'Jan 21', estrogen: 150, progesterone: 90, testosterone: 37, cortisol: 13 },
  { date: 'Jan 28', estrogen: 95, progesterone: 20, testosterone: 39, cortisol: 16 },
  { date: 'Feb 04', estrogen: 110, progesterone: 8, testosterone: 40, cortisol: 15 },
];

const HormoneTrendsTab = () => {
  return (
    <AnimatedCard>
      <GlassCard>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Hormone Trends Analysis</h3>
          <p className="text-sm text-muted-foreground">Visualize your hormone patterns over time</p>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <Button variant="outline" size="sm" className="h-8">Last Month</Button>
          <Button variant="outline" size="sm" className="h-8">3 Months</Button>
          <Button variant="outline" size="sm" className="h-8">6 Months</Button>
          <Button variant="outline" size="sm" className="h-8">1 Year</Button>
          <Button variant="outline" size="sm" className="h-8">Custom Range</Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-hormone-estrogen"></div>
              <span className="text-xs">Estrogen</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-hormone-progesterone"></div>
              <span className="text-xs">Progesterone</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-hormone-testosterone"></div>
              <span className="text-xs">Testosterone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-hormone-cortisol"></div>
              <span className="text-xs">Cortisol</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hormoneData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  border: 'none'
                }} 
              />
              <Line type="monotone" dataKey="estrogen" stroke="#FF84B1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="progesterone" stroke="#AD8CEB" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="testosterone" stroke="#6AC1FF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="cortisol" stroke="#FFA451" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">AI Insights</h4>
          <p className="text-sm text-muted-foreground">Your progesterone levels have been declining over the past 3 months, which may be contributing to sleep issues. Consider adding magnesium-rich foods and reducing caffeine intake.</p>
        </div>
      </GlassCard>
    </AnimatedCard>
  );
};

export default HormoneTrendsTab;
