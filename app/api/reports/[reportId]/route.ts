// Help the admin/authority to handle status of report
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth"

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const session = await getServerSession();
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const { status } = await request.json();
      const report = await prisma.report.update({
        where: { id: params.id },
        data: { status },
      });
  
      return NextResponse.json(report);
    } catch (error) {
      return NextResponse.json(
        { error: "Error updating report" },
        { status: 500 }
      );
    }
  }