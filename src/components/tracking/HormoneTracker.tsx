
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Textarea } from '@/components/ui/textarea';
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

const symptoms = [
  'Hot Flashes',
  'Night Sweats',
  'Mood Swings',
  'Sleep Issues',
  'Anxiety',
  'Fatigue',
  'Headaches',
  'Joint Pain',
  'Bloating',
  'Brain Fog',
  'Low Libido',
  'Vaginal Dryness',
];

const HormoneTracker = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hormone Tracking</h1>
        <p className="text-muted-foreground">Monitor and log your hormone levels and related symptoms</p>
      </div>

      <Tabs defaultValue="log" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger 
            value="log" 
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium"
          >
            Record Data
          </TabsTrigger>
          <TabsTrigger 
            value="trends" 
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium"
          >
            Hormone Trends
          </TabsTrigger>
          <TabsTrigger 
            value="symptoms" 
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium"
          >
            Symptom Tracking
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="log" className="mt-4 space-y-4">
          <AnimatedCard>
            <Card>
              <CardHeader>
                <CardTitle>Quick Estimate</CardTitle>
                <CardDescription>Don't have lab values? Estimate based on symptoms and cycle day</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Menstrual Cycle Phase</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current phase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="follicular">Follicular Phase (Days 1-14)</SelectItem>
                        <SelectItem value="ovulation">Ovulation (Days 14-16)</SelectItem>
                        <SelectItem value="luteal">Luteal Phase (Days 16-28)</SelectItem>
                        <SelectItem value="perimenopause">Perimenopause</SelectItem>
                        <SelectItem value="postmenopause">Postmenopause</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Energy Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="How's your energy today?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-low">Very Low</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="very-high">Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Stress Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your stress level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-low">Very Low</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="very-high">Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Sleep Quality</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="How did you sleep?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-poor">Very Poor</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Estimate Hormone Levels</Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-4">
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
        </TabsContent>
        
        <TabsContent value="symptoms" className="mt-4">
          <AnimatedCard>
            <Card>
              <CardHeader>
                <CardTitle>Symptom Tracker</CardTitle>
                <CardDescription>Track symptoms that may be related to hormone changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="symptom-date">Date</Label>
                    <input id="symptom-date" type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select Symptoms (choose all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {symptoms.map((symptom) => (
                        <div key={symptom} className="flex items-center space-x-2">
                          <input type="checkbox" id={symptom} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                          <Label htmlFor={symptom} className="text-sm font-normal">{symptom}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Symptom Severity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild - Noticeable but not disruptive</SelectItem>
                        <SelectItem value="moderate">Moderate - Somewhat disruptive</SelectItem>
                        <SelectItem value="severe">Severe - Significantly disruptive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="symptom-notes">Notes</Label>
                    <Textarea id="symptom-notes" placeholder="Add details about your symptoms" />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Symptoms</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HormoneTracker;
