"use client";
import { useState } from "react";
import { ReportForm } from "./ReportForm";
// Report Form
// After form submitted: ReportSubmitted

export function ReportWizard() {

    const [currStep, setCurrStep] = useState(1);
    console.log(setCurrStep)

    return(
        <div className="rounded-2xl bg-zinc-900 p-8">
            {/* Render component based on step */}
            {
                currStep === 1 && <ReportForm/>
            }
        </div>
    )
}