"use client";
import { useState } from "react";
import { ReportForm } from "./ReportForm";
// Report Form
// After form submitted: ReportSubmitted

export function ReportWizard() {

    const [currStep, setCurrStep] = useState(1);
    const [reportData, setReportData] = useState<any>(null);
    console.log(setCurrStep)

    const handleStepComplete = async (data: any) => {
        setReportData({ ...reportData, ...data });
    
        if (currStep === 4) {
          return;
        }
    
        setCurrStep((prev) => prev + 1);
      };

    return(
        <div className="rounded-2xl bg-zinc-900 p-8">
            {/* Render component based on step */}
            {
                currStep === 1 && <ReportForm onComplete={handleStepComplete}/>
            }
        </div>
    )
}