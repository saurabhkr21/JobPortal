import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await getUserFromCookies();
    const { id: applicationId } = await params;

    if (!user) {
        return NextResponse.json({
            success: false,
            message: "User not authenticated",
        });
    }

    try {
        // 1. Verify that the current user is the owner of the job associated with this application
        const application = await prismaClient.application.findUnique({
            where: { id: applicationId },
            include: {
                job: true
            },
        });

        if (!application) {
            return NextResponse.json({
                success: false,
                message: "Application not found",
            });
        }

        if (application.job?.companyId) {
            const company = await prismaClient.company.findUnique({
                where: { id: application.job.companyId },
            });
            if (company?.ownerId !== user.id) {
                return NextResponse.json({
                    success: false,
                    message: "Unauthorized: You are not the owner of this job",
                });
            }
        } else {
            // Fallback for logic if job ownership structure is different, but based on schema companyId is required on job.
            return NextResponse.json({
                success: false,
                message: "Job or Company not found for this application",
            });
        }

        // 2. Delete the application
        await prismaClient.application.delete({
            where: {
                id: applicationId,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Application deleted successfully",
        });
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message || "Failed to delete application",
        });
    }
}
