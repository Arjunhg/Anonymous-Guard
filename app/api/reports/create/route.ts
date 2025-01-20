// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { ReportType } from "@prisma/client";

// export async function POST(req: Request) {
//     try {
//         const {
//             reportId,
//             type,
//             specificType,
//             title,
//             description,
//             location,
//             latitude,
//             longitude,
//             image,
//             status,
//         } = await req.json(); //from components\report\ReportForm.tsx in handleSubmit as body: JSON.stringify(reportData),

//         const report = await prisma.report.create({
//             data: {
//                 reportId,
//                 type: type as ReportType,
//                 title,
//                 description,
//                 reportType: specificType,
//                 location,
//                 latitude: latitude || null,
//                 longitude: longitude || null,
//                 image: image || null,
//                 status: status || "PENDING",
//             },
//         })

//         return NextResponse.json({
//             success: true,
//             reportId: report.reportId,
//             message: "Report created successfully",
//         })
//     } catch (error) {
//         console.error("Error creating report:", error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 message: "Error creating report",
//             },
//             { status: 500 }
//         )
//     }
// }



import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ReportType, ReportStatus } from "@prisma/client";
import { z } from "zod"; // Add zod for validation

// Define validation schema
const ReportSchema = z.object({
  reportId: z.string().min(1),
  type: z.enum(["EMERGENCY", "NON_EMERGENCY"]),
  specificType: z.string().min(1),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  location: z.string().min(1),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  image: z.string().nullable(),
  status: z.enum(["PENDING", "IN_PROGRESS", "RESOLVED", "REJECTED"]).default("PENDING"),
});

export async function POST(req: Request) {
  try {
    // Check if request is JSON
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { error: "Content type must be application/json" },
        { status: 415 }
      );
    }

    const body = await req.json();

    // Validate input
    const validationResult = ReportSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Sanitize data (remove any HTML/script tags from text fields)
    const sanitizedData = {
      ...data,
      title: data.title.replace(/<[^>]*>/g, ''),
      description: data.description.replace(/<[^>]*>/g, ''),
      location: data.location.replace(/<[^>]*>/g, ''),
    };

    // Create report with transaction to ensure atomicity
    const report = await prisma.$transaction(async (tx) => {
      // Check if report with same ID exists
      const existing = await tx.report.findUnique({
        where: { reportId: sanitizedData.reportId },
      });

      if (existing) {
        throw new Error("Report with this ID already exists");
      }

      return tx.report.create({
        data: {
          reportId: sanitizedData.reportId,
          type: sanitizedData.type as ReportType,
          title: sanitizedData.title,
          description: sanitizedData.description,
          reportType: sanitizedData.specificType,
          location: sanitizedData.location,
          latitude: sanitizedData.latitude,
          longitude: sanitizedData.longitude,
          image: sanitizedData.image,
          status: sanitizedData.status as ReportStatus,
        },
      });
    });

    // Log successful creation (implement your logging solution)
    console.log(`Report created: ${report.reportId}`);

    return NextResponse.json(report, { status: 201 });

  } catch (error) {
    console.error("Error creating report:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.flatten() },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}