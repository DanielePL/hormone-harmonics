
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const TrendsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hormone Trends</CardTitle>
        <CardDescription>
          Track your hormone levels over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center border border-border rounded-md bg-muted/30">
          <p className="text-muted-foreground">Hormone trend chart will be displayed here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendsTab;
