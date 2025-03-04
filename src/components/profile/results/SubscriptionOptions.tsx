
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Heart } from 'lucide-react';

const SubscriptionOptions = () => {
  return (
    <div className="mt-6 p-5 rounded-lg border-2 border-primary bg-primary/5">
      <div className="flex items-center gap-3 mb-3">
        <Heart className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold">Unlock Your Full Personalized Plan</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        You're not alone on this journey. Join thousands of women who have transformed their menopause experience with our AI-powered plans.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium">Monthly</h4>
              <p className="text-2xl font-bold">$19.99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
            </div>
            <div className="px-2 py-1 bg-primary/10 rounded text-xs font-medium text-primary">
              POPULAR
            </div>
          </div>
          <ul className="space-y-2 mb-3">
            <li className="text-xs flex items-center gap-2">
              <Check className="h-3 w-3 text-primary" />
              <span>Full AI hormone optimization plan</span>
            </li>
            <li className="text-xs flex items-center gap-2">
              <Check className="h-3 w-3 text-primary" />
              <span>Weekly adjustments based on your data</span>
            </li>
            <li className="text-xs flex items-center gap-2">
              <Check className="h-3 w-3 text-primary" />
              <span>Personalized tracking dashboard</span>
            </li>
          </ul>
          <Button className="w-full bg-primary">Start 7-Day Free Trial</Button>
        </div>
        
        <div className="p-3 rounded-lg bg-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium">Annual</h4>
              <p className="text-2xl font-bold">$179.99<span className="text-sm font-normal text-muted-foreground">/year</span></p>
            </div>
            <div className="px-2 py-1 bg-green-100 rounded text-xs font-medium text-green-700">
              SAVE 20%
            </div>
          </div>
          <ul className="space-y-2 mb-3">
            <li className="text-xs flex items-center gap-2">
              <Check className="h-3 w-3 text-primary" />
              <span>Everything in Monthly plan</span>
            </li>
            <li className="text-xs flex items-center gap-2">
              <Check className="h-3 w-3 text-primary" />
              <span>Free hormone testing kit</span>
            </li>
            <li className="text-xs flex items-center gap-2">
              <Check className="h-3 w-3 text-primary" />
              <span>Priority support and coaching</span>
            </li>
          </ul>
          <Button variant="outline" className="w-full border-primary text-primary">Choose Annual Plan</Button>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        100% satisfaction guarantee • Cancel anytime • Secure payment
      </p>
    </div>
  );
};

export default SubscriptionOptions;
