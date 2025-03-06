
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimatedCard from '@/components/ui/AnimatedCard';

const RecordDataTab = () => {
  return (
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
  );
};

export default RecordDataTab;
