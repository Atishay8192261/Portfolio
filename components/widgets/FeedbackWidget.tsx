'use client';

import { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FeedbackWidgetProps {
  isDark: boolean;
}

export function FeedbackWidget({ isDark }: FeedbackWidgetProps) {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState({ design: '', usability: '', content: '' });

  const questions = [
    {
      question: "How would you rate the design of this portfolio?",
      options: ["Excellent", "Good", "Average", "Poor"],
      key: "design"
    },
    {
      question: "How easy is it to navigate this portfolio?",
      options: ["Very Easy", "Easy", "Somewhat Difficult", "Very Difficult"],
      key: "usability"
    },
    {
      question: "How informative is the content of this portfolio?",
      options: ["Very Informative", "Informative", "Somewhat Informative", "Not Informative"],
      key: "content"
    }
  ];

  const handleSubmit = async () => {
    console.log('Feedback submitted:', feedback);
    setFeedback({ design: '', usability: '', content: '' });
    setStep(0);
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  return (
    <Card className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-primary" />
          <span className="font-medium">Feedback</span>
        </div>
        <div className="space-y-4 flex-grow">
          <p className="text-lg font-medium">{questions[step].question}</p>
          <RadioGroup
            value={feedback[questions[step].key]}
            onValueChange={(value) => setFeedback({ ...feedback, [questions[step].key]: value })}
          >
            {questions[step].options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Button onClick={handleNext} className="w-full mt-4">
          {step === questions.length - 1 ? 'Submit' : 'Next'}
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}