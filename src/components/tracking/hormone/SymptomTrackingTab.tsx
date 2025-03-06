
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AnimatedCard from '@/components/ui/AnimatedCard';

// Symptoms list
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

const SymptomTrackingTab = () => {
  return (
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
  );
};

export default SymptomTrackingTab;
