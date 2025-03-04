
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, AlertCircle, Check, Info, BarChart, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import InsightPanel from '@/components/ui/InsightPanel';
import AnimatedCard from '@/components/ui/AnimatedCard';

const BloodTestAnalysis = () => {
  const [activeTab, setActiveTab] = useState('results');
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = (e) => {
    // This would handle the file upload in a real implementation
    e.preventDefault();
    setFileUploaded(true);
  };

  return (
    <div className="container p-4 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blood Test Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Upload your lab results for personalized insights and recommendations
          </p>
        </div>
      </div>

      {!fileUploaded ? (
        <UploadSection onUpload={handleFileUpload} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="results" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hormone Panel</CardTitle>
                    <CardDescription>
                      Your latest hormone levels from May 15, 2023
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <TestResultItem 
                        name="Estrogen (Estradiol)" 
                        value={35} 
                        unit="pg/ml" 
                        range="30-400" 
                        status="normal" 
                        info="Estradiol levels in postmenopausal range, supporting your current phase."
                      />
                      <TestResultItem 
                        name="Progesterone" 
                        value={0.3} 
                        unit="ng/ml" 
                        range="0.1-0.8" 
                        status="normal" 
                        info="Progesterone levels are in the expected postmenopausal range."
                      />
                      <TestResultItem 
                        name="Testosterone (Total)" 
                        value={18} 
                        unit="ng/dl" 
                        range="15-70" 
                        status="normal" 
                        info="Total testosterone is in the normal range for your age."
                      />
                      <TestResultItem 
                        name="Cortisol (Morning)" 
                        value={22} 
                        unit="μg/dl" 
                        range="5-23" 
                        status="high" 
                        info="Morning cortisol is on the higher end, which may impact energy and recovery."
                      />
                      <TestResultItem 
                        name="TSH" 
                        value={3.8} 
                        unit="mIU/L" 
                        range="0.4-4.0" 
                        status="borderline" 
                        info="TSH is on the higher end of normal, suggesting potential subclinical hypothyroidism."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Metabolic Health</CardTitle>
                    <CardDescription>
                      Key metabolic markers from your latest blood test
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <TestResultItem 
                        name="Fasting Glucose" 
                        value={95} 
                        unit="mg/dl" 
                        range="70-99" 
                        status="borderline" 
                        info="Fasting glucose is at the upper end of normal range."
                      />
                      <TestResultItem 
                        name="HbA1c" 
                        value={5.6} 
                        unit="%" 
                        range="<5.7" 
                        status="borderline" 
                        info="HbA1c indicates pre-diabetic range. Consider dietary modifications."
                      />
                      <TestResultItem 
                        name="Total Cholesterol" 
                        value={210} 
                        unit="mg/dl" 
                        range="<200" 
                        status="high" 
                        info="Cholesterol is slightly elevated above recommended levels."
                      />
                      <TestResultItem 
                        name="HDL" 
                        value={65} 
                        unit="mg/dl" 
                        range=">50" 
                        status="optimal" 
                        info="HDL (good cholesterol) is at a healthy level, providing cardiovascular protection."
                      />
                      <TestResultItem 
                        name="LDL" 
                        value={125} 
                        unit="mg/dl" 
                        range="<100" 
                        status="high" 
                        info="LDL is above optimal levels. Consider diet and lifestyle adjustments."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="trends">
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
              </TabsContent>
              
              <TabsContent value="recommendations">
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
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <AnimatedCard className="p-6 bg-background border border-border shadow-sm rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Test Summary</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Optimal</span>
                    <span className="text-sm text-muted-foreground">4 markers</span>
                  </div>
                  <Progress value={40} className="bg-insight-optimal h-2" indicatorClassName="bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Borderline</span>
                    <span className="text-sm text-muted-foreground">3 markers</span>
                  </div>
                  <Progress value={30} className="bg-insight-high h-2" indicatorClassName="bg-yellow-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Out of Range</span>
                    <span className="text-sm text-muted-foreground">3 markers</span>
                  </div>
                  <Progress value={30} className="bg-insight-low h-2" indicatorClassName="bg-red-500" />
                </div>
              </div>
            </AnimatedCard>
            
            <InsightPanel 
              title="AI Analysis" 
              insights={[
                "Your cortisol and blood sugar patterns suggest HPA axis dysregulation.",
                "Thyroid function borderline—monitor for potential medication needs.",
                "Good HDL levels indicate effective cardiovascular protection.",
                "Consider strength training to improve metabolic markers."
              ]}
            />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <span>Review your personalized health plan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Info size={14} className="text-blue-600" />
                    </div>
                    <span>Schedule follow-up tests in 3 months</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                      <AlertCircle size={14} className="text-yellow-600" />
                    </div>
                    <span>Consult with healthcare provider about thyroid function</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

const UploadSection = ({ onUpload }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <AnimatedCard className="p-8 border-2 border-dashed border-border rounded-xl">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Upload size={28} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Upload Your Blood Test Results</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Drag and drop your PDF or CSV file, or click to browse. We support major lab formats 
            including Quest, LabCorp, and more.
          </p>
          
          <div className="pt-4">
            <form onSubmit={onUpload}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FileText size={18} />
                  Upload Lab Results
                </button>
                <button 
                  type="button"
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Info size={18} />
                  See Supported Formats
                </button>
              </div>
            </form>
          </div>
          
          <div className="pt-6 pb-2">
            <p className="text-sm text-muted-foreground">
              Your data is encrypted and never shared. Learn more about our {" "}
              <a href="#" className="text-primary hover:underline">privacy policy</a>.
            </p>
          </div>
        </div>
      </AnimatedCard>
      
      <div className="mt-8 grid sm:grid-cols-3 gap-6">
        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <FileText size={20} className="text-primary" />
              </div>
              <h4 className="font-medium">Upload Lab Results</h4>
              <p className="text-sm text-muted-foreground">
                We analyze 50+ markers to generate insights
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <BarChart size={20} className="text-primary" />
              </div>
              <h4 className="font-medium">Get Insights</h4>
              <p className="text-sm text-muted-foreground">
                AI analyzes your results for key health patterns
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Check size={20} className="text-primary" />
              </div>
              <h4 className="font-medium">Personalized Plan</h4>
              <p className="text-sm text-muted-foreground">
                Receive custom fitness & nutrition recommendations
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const TestResultItem = ({ name, value, unit, range, status, info }) => {
  const getStatusColors = () => {
    switch (status) {
      case 'optimal':
        return {
          bg: 'bg-insight-optimal',
          text: 'text-green-700',
          icon: <Check size={16} />
        };
      case 'normal':
        return {
          bg: 'bg-insight-optimal',
          text: 'text-green-700',
          icon: <Check size={16} />
        };
      case 'borderline':
        return {
          bg: 'bg-insight-high',
          text: 'text-yellow-700',
          icon: <Minus size={16} />
        };
      case 'high':
        return {
          bg: 'bg-insight-low',
          text: 'text-red-700',
          icon: <ArrowUp size={16} />
        };
      case 'low':
        return {
          bg: 'bg-insight-low',
          text: 'text-red-700',
          icon: <ArrowDown size={16} />
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          icon: <Info size={16} />
        };
    }
  };

  const { bg, text, icon } = getStatusColors();

  return (
    <div className="p-4 border border-border rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div>
          <h4 className="font-medium">{name}</h4>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Range: {range}</span>
          <div className={`px-2 py-1 rounded-full ${bg} ${text} flex items-center gap-1 text-xs font-medium`}>
            {icon}
            <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </div>
        </div>
      </div>
      {info && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground">{info}</p>
        </div>
      )}
    </div>
  );
};

const RecommendationCard = ({ title, description, items, priority }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className={`p-4 border rounded-lg ${getPriorityColor()}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            {priority === 'high' ? (
              <AlertCircle size={16} className="text-red-500" />
            ) : priority === 'medium' ? (
              <Info size={16} className="text-yellow-500" />
            ) : (
              <Check size={16} className="text-green-500" />
            )}
          </div>
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          
          <ul className="mt-3 space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="rounded-full w-4 h-4 bg-white flex items-center justify-center mt-0.5">
                  <Check size={10} className="text-primary" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BloodTestAnalysis;
