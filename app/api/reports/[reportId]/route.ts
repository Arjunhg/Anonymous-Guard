import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { ReportStatus } from "@prisma/client";

export async function PATCH(
    request: Request,
    { params }: { params: { reportId: string } }
) {
    try {
        // Verify session
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get and validate request data
        const { status } = await request.json();
        
        if (!status || !Object.values(ReportStatus).includes(status)) {
            return NextResponse.json(
                { error: "Invalid status value" },
                { status: 400 }
            );
        }

        // First check if report exists
        const existingReport = await prisma.report.findUnique({
            where: { reportId: params.reportId }
        });

        if (!existingReport) {
            return NextResponse.json(
                { error: `Report with ID ${params.reportId} not found` },
                { status: 404 }
            );
        }

        // Update report
        const updatedReport = await prisma.report.update({
            where: { reportId: params.reportId },
            data: { 
                status: status as ReportStatus,
                updatedAt: new Date()
            }
        });

        // Log the update
        console.log(`Updated report ${params.reportId} status to ${status}`);

        return NextResponse.json({
            success: true,
            data: updatedReport
        });
        
    } catch (error) {
        console.error("Detailed error:", error);
        return NextResponse.json(
            { 
                error: "Error updating report",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}