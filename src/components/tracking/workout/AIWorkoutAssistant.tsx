import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Send, Dumbbell } from 'lucide-react';
import { UserProfile } from '@/utils/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

const WorkoutLogger = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white">
        <h1 className="text-2xl font-bold text-pink-600">Hormone Harmonics</h1>
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-2">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Your Fitness Journey</h2>
          <p className="text-gray-500">Track your progress and maintain strength with workouts tailored to your body's needs</p>
        </div>

        {/* Navigation Tabs - Fixed with grid layout for proper alignment */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <button className="py-2 px-4 rounded-lg bg-pink-100 text-pink-600 font-medium text-sm">
            Log Workout
          </button>
          <button className="py-2 px-4 rounded-lg bg-gray-100 text-gray-600 font-medium text-sm">
            My Plan
          </button>
          <button className="py-2 px-4 rounded-lg bg-gray-100 text-gray-600 font-medium text-sm">
            Progress
          </button>
          <button className="py-2 px-4 rounded-lg bg-gray-100 text-gray-600 font-medium text-sm">
            AI Coach
          </button>
        </div>

        {/* Workout Form */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
          <div className="flex items-center mb-3">
            <span className="mr-2 text-pink-500">
              <Dumbbell size={20} />
            </span>
            <h3 className="text-xl font-bold">Log Your Workout</h3>
          </div>
          <p className="text-gray-500 mb-4 text-sm">Keep track of your strength and build consistency</p>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Date</label>
              <div className="flex">
                <div className="relative flex-1 mr-2">
                  <input 
                    type="text" 
                    placeholder="tt.mm.jjjj" 
                    className="w-full border rounded p-2 pl-8"
                  />
                  <span className="absolute left-2 top-2.5 text-pink-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </span>
                </div>
                <button className="border rounded p-2 w-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Workout Type</label>
              <select className="w-full border rounded p-2 text-gray-700 appearance-none bg-white">
                <option disabled selected>Select workout type</option>
                <option>Strength Training</option>
                <option>Cardio</option>
                <option>Yoga</option>
                <option>Pilates</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Duration (minutes)</label>
              <input type="range" className="w-full" />
            </div>
          </form>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="grid grid-cols-5 bg-white pt-2 border-t">
        <button className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span className="text-xs mt-1">Profile</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
          <span className="text-xs mt-1">Hormones</span>
        </button>
        <button className="flex flex-col items-center p-2 text-pink-500">
          <Dumbbell size={20} />
          <span className="text-xs mt-1">Workouts</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
          <span className="text-xs mt-1">Nutrition</span>
        </button>
      </nav>
    </div>
  );
};

export default WorkoutLogger;
