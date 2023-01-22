import React from "react";

export type Steps = {
  label: string;
  component: React.ReactNode;
}[];

export function useMultiStepForm(steps: Steps) {
  const [stepIndex, setStepIndex] = React.useState(0);

  const nextStep = () => {
    if (isLastStep) return stepIndex;
    setStepIndex((prev) => prev + 1);
  };

  const previousStep = () => {
    if (isFirstStep) return stepIndex;
    setStepIndex((prev) => prev - 1);
  };

  const isLastStep = stepIndex === steps.length - 1;
  const isFirstStep = stepIndex === 0;
  const currentStep = steps[stepIndex];

  return {
    nextStep,
    previousStep,
    isLastStep,
    isFirstStep,
    currentStep,
  };
}
