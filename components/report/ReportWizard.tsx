"use client";
import { useState } from "react";
import { ReportForm } from "./ReportForm";
import { ReportFormCompleted } from "./ReportFormCompleted";
// Report Form
// After form submitted: ReportSubmitted

export function ReportWizard() {

    const [currStep, setCurrStep] = useState(1);
    // @ts-ignore: Props data will be handled dynamically
    const [reportData, setReportData] = useState<any>(null);
    console.log(setCurrStep)

    // @ts-ignore: Props data will be handled dynamically
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
            {/* after creating api rouetes */}
            {
                currStep === 2 && <ReportFormCompleted data={reportData} onComplete={handleStepComplete}/>
            }
        </div>
    )
}