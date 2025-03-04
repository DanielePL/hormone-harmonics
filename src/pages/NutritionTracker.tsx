
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import InsightPanel from '@/components/ui/InsightPanel';

const NutritionTracker = () => {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <div className="container p-4 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nutrition Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Track your macros, fiber intake, and hormone-supporting nutrients
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Add Meal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Today's Nutrition Summary</CardTitle>
                  <CardDescription>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <MacroCard 
                      title="Protein" 
                      current={85} 
                      target={120} 
                      unit="g" 
                      color="bg-blue-500" 
                    />
                    <MacroCard 
                      title="Carbs" 
                      current={145} 
                      target={200} 
                      unit="g" 
                      color="bg-orange-500" 
                    />
                    <MacroCard 
                      title="Fats" 
                      current={45} 
                      target={60} 
                      unit="g" 
                      color="bg-yellow-500" 
                    />
                    <MacroCard 
                      title="Fiber" 
                      current={18} 
                      target={30} 
                      unit="g" 
                      color="bg-green-600" 
                      emphasis
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Today's Meals</CardTitle>
                    <CardDescription>
                      Log your meals and track your nutrients
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-md hover:bg-secondary">
                      <Search size={18} className="text-muted-foreground" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-secondary">
                      <Filter size={18} className="text-muted-foreground" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meals.map((meal) => (
                      <MealCard key={meal.id} meal={meal} />
                    ))}
                    <button className="w-full py-3 border-2 border-dashed border-border rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                      <Plus size={18} />
                      <span>Add Another Meal</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Nutrition Overview</CardTitle>
                  <CardDescription>
                    View your nutrition patterns over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-border rounded-md bg-muted/30">
                    <p className="text-muted-foreground">Weekly nutrition chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Nutrition Trends</CardTitle>
                  <CardDescription>
                    Track your long-term nutrition habits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-border rounded-md bg-muted/30">
                    <p className="text-muted-foreground">Monthly nutrition trends will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold mb-4">Hormone-Supporting Nutrients</h3>
            <div className="space-y-3">
              <NutrientProgressBar 
                name="Magnesium" 
                current={210} 
                target={320} 
                unit="mg" 
                color="bg-hormone-progesterone"
              />
              <NutrientProgressBar 
                name="Vitamin D" 
                current={800} 
                target={2000} 
                unit="IU" 
                color="bg-yellow-400"
              />
              <NutrientProgressBar 
                name="Omega-3" 
                current={1.2} 
                target={3} 
                unit="g" 
                color="bg-blue-400"
              />
              <NutrientProgressBar 
                name="B6" 
                current={1.1} 
                target={1.5} 
                unit="mg" 
                color="bg-green-400"
              />
              <NutrientProgressBar 
                name="Zinc" 
                current={7} 
                target={11} 
                unit="mg" 
                color="bg-gray-400"
              />
            </div>
          </GlassCard>
          
          <InsightPanel 
            title="Nutrition Insights" 
            insights={[
              "Your fiber intake is below target. Try adding chia seeds to increase daily fiber.",
              "Current protein intake supports your strength training goals.",
              "Consider increasing magnesium-rich foods to support progesterone production."
            ]}
          />

          <Card>
            <CardHeader>
              <CardTitle>Recommended Foods</CardTitle>
              <CardDescription>Based on your hormone profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <RecommendedFoodItem 
                  name="Flaxseeds" 
                  benefit="Supports estrogen balance" 
                  category="Phytoestrogens"
                />
                <RecommendedFoodItem 
                  name="Dark Leafy Greens" 
                  benefit="Rich in magnesium for progesterone" 
                  category="Magnesium"
                />
                <RecommendedFoodItem 
                  name="Wild Salmon" 
                  benefit="Omega-3s reduce inflammation" 
                  category="Omega-3"
                />
                <RecommendedFoodItem 
                  name="Pumpkin Seeds" 
                  benefit="Supports testosterone production" 
                  category="Zinc"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const MacroCard = ({ title, current, target, unit, color, emphasis = false }) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <div className={`rounded-lg p-4 ${emphasis ? 'ring-2 ring-primary' : 'bg-card'}`}>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="mt-2 flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold">{current}</p>
          <p className="text-sm text-muted-foreground">of {target}{unit}</p>
        </div>
        <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-background" style={{ backgroundColor: emphasis ? 'var(--primary)' : color }}>
          {percentage}%
        </div>
      </div>
      <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full" 
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: emphasis ? 'var(--primary)' : color 
          }}
        ></div>
      </div>
    </div>
  );
};

const MealCard = ({ meal }) => {
  return (
    <div className="border border-border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-foreground">{meal.name}</h4>
          <p className="text-sm text-muted-foreground">{meal.time}</p>
        </div>
        <div className="text-right">
          <p className="font-medium">{meal.calories} kcal</p>
          <div className="flex gap-2 text-xs text-muted-foreground mt-1">
            <span>P: {meal.protein}g</span>
            <span>C: {meal.carbs}g</span>
            <span>F: {meal.fat}g</span>
          </div>
        </div>
      </div>
      {meal.foods && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {meal.foods.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
};

const NutrientProgressBar = ({ name, current, target, unit, color }) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span className="text-muted-foreground">
          {current} / {target} {unit}
        </span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

const RecommendedFoodItem = ({ name, benefit, category }) => {
  return (
    <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
      <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{benefit}</p>
        <span className="text-xs px-2 py-0.5 bg-secondary rounded-full mt-1 inline-block">
          {category}
        </span>
      </div>
    </div>
  );
};

// Sample data
const meals = [
  {
    id: 1,
    name: "Breakfast",
    time: "7:30 AM",
    calories: 420,
    protein: 25,
    carbs: 45,
    fat: 15,
    foods: ["Greek yogurt", "Berries", "Almond butter", "Chia seeds"]
  },
  {
    id: 2,
    name: "Lunch",
    time: "12:15 PM",
    calories: 580,
    protein: 35,
    carbs: 60,
    fat: 20,
    foods: ["Grilled chicken", "Quinoa", "Roasted vegetables", "Avocado"]
  },
  {
    id: 3,
    name: "Snack",
    time: "3:45 PM",
    calories: 180,
    protein: 10,
    carbs: 15,
    fat: 8,
    foods: ["Protein shake", "Apple", "Almonds"]
  },
];

export default NutritionTracker;
