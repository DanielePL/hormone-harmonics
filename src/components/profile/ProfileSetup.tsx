
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import AnimatedCard from '@/components/ui/AnimatedCard';
import StepIndicator from './StepIndicator';

// Step Components
import BasicInfoStep from './steps/BasicInfoStep';
import SymptomsStep from './steps/SymptomsStep';
import LifestyleStep from './steps/LifestyleStep';
import HormoneStep from './steps/HormoneStep';
import ResultsStep from './results/ResultsStep';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: 'Moderate',
    menopauseStatus: 'Peri',
    symptoms: {
      weightGain: false,
      hotFlashes: false,
      fatigue: false,
      sleepIssues: false,
      moodChanges: false,
      brainFog: false,
      jointPain: false,
    },
    currentlyTracking: false,
    fitnessLevel: 'Somewhat',
    readyForChange: 'Ready',
    hasMenstrualCycle: false,
    lastPeriodDate: '',
    hasHormoneProfile: false,
    hasLabReport: false,
    interestedInTesting: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value === 'yes' }));
  };

  const handleReadinessChange = (value: string) => {
    setFormData(prev => ({ ...prev, readyForChange: value }));
  };

  const handleFitnessLevelChange = (value: string) => {
    setFormData(prev => ({ ...prev, fitnessLevel: value }));
  };

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [symptom]: !prev.symptoms[symptom as keyof typeof prev.symptoms]
      }
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  
  const prevStep = () => setStep(prev => prev - 1);
  
  const handleComplete = () => {
    toast({
      title: "Profile Created Successfully",
      description: "Your personalized hormone optimization plan is ready!",
      duration: 5000,
    });
    
    // Navigate to dashboard after completion
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const stepLabels = ["Your Struggles", "Symptom Check", "Quick Assessment", "Hormone Profile", "Your Results"];
  const stepDescription = "Complete this short quiz to get your personalized hormone & fitness analysis";

  // Render current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AnimatedCard>
            <BasicInfoStep 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleSelectChange={handleSelectChange} 
              nextStep={nextStep}
            />
          </AnimatedCard>
        );
      case 2:
        return (
          <AnimatedCard>
            <SymptomsStep 
              symptoms={formData.symptoms} 
              handleSymptomToggle={handleSymptomToggle} 
              nextStep={nextStep} 
              prevStep={prevStep}
            />
          </AnimatedCard>
        );
      case 3:
        return (
          <AnimatedCard>
            <LifestyleStep 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleRadioChange={handleRadioChange} 
              handleFitnessLevelChange={handleFitnessLevelChange}
              handleReadinessChange={handleReadinessChange}
              nextStep={nextStep} 
              prevStep={prevStep}
            />
          </AnimatedCard>
        );
      case 4:
        return (
          <AnimatedCard>
            <HormoneStep 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleRadioChange={handleRadioChange} 
              nextStep={nextStep} 
              prevStep={prevStep}
            />
          </AnimatedCard>
        );
      case 5:
        return (
          <AnimatedCard>
            <ResultsStep 
              symptoms={formData.symptoms}
              handleComplete={handleComplete}
            />
          </AnimatedCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-0">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          {step < 5 ? "Get Your Free Hormone Analysis" : "Your Personalized Results"}
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {step < 5 
            ? "Let our AI create a personalized health plan based on your unique menopause journey" 
            : "Based on your inputs, we've created your personalized hormone-optimized plan"}
        </p>
      </div>

      <StepIndicator 
        currentStep={step} 
        totalSteps={5} 
        labels={stepLabels}
        description={stepDescription}
      />

      {renderStep()}
    </div>
  );
};

export default ProfileSetup;
