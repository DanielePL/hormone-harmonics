
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import RecommendationCard from './RecommendationCard';

const RecommendationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Recommendations</CardTitle>
        <CardDescription>
          Based on your blood test results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <RecommendationCard 
            title="Reduce Cortisol Levels" 
            description="Your cortisol is slightly elevated. Consider these stress-reduction strategies:"
            items={[
              "Incorporate 10-15 minutes of daily meditation or deep breathing",
              "Limit high-intensity workouts to 2-3 times per week",
              "Prioritize 7-8 hours of quality sleep",
              "Consider magnesium supplementation (300-400mg daily)"
            ]}
            priority="high"
          />
          
          <RecommendationCard 
            title="Support Thyroid Function" 
            description="Your TSH is at the upper end of normal, suggesting mild thyroid stress:"
            items={[
              "Include iodine-rich foods like seaweed and fish",
              "Ensure adequate selenium intake (brazil nuts, seafood)",
              "Reduce gluten if sensitive (may interfere with thyroid function)",
              "Consider vitamin D supplementation if levels are low"
            ]}
            priority="medium"
          />
          
          <RecommendationCard 
            title="Improve Insulin Sensitivity" 
            description="Your glucose metrics suggest developing insulin resistance:"
            items={[
              "Incorporate strength training 3-4 times weekly",
              "Add 30 minutes of zone 2 cardio on most days",
              "Increase fiber intake to 30+ grams daily",
              "Consider berberine or alpha-lipoic acid supplements (consult healthcare provider)"
            ]}
            priority="high"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsTab;
