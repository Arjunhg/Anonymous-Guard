
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    _: Request,
    { params }: { params: { reportId: string } }
  ) {
    try {
      const report = await prisma.report.findUnique({
        where: {
          reportId: params.reportId,
        },
      });
  
      if (!report) {
        return NextResponse.json({ error: "Report not found" }, { status: 404 });
      }
  
      return NextResponse.json(report);
    } catch (error) {
      console.error("Error fetching report details:", error);
      return NextResponse.json(
        { error: "Failed to fetch report details" },
        { status: 500 }
      );
    }
  }

  