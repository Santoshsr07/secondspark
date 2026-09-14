import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { generateRecommendation } from "@/app/lib/assessment-engine";

const assessmentSchema = z.object({
  userEmail: z.string().email(),
  userName: z.string().min(1).max(100).optional(),
  problemDescription: z.string().optional(),

  device: z.object({
    type: z.enum([
      "LAPTOP",
      "SMARTPHONE",
      "TABLET",
      "DESKTOP",
      "GAMING_CONSOLE",
      "TV",
      "OTHER",
    ]),
    brand: z.string().max(100).optional(),
    model: z.string().max(100).optional(),
    purchaseYear: z
      .number()
      .int()
      .min(1970)
      .max(new Date().getFullYear())
      .optional(),
  }),

  condition: z
    .enum([
      "WORKS_NORMALLY",
      "WORKS_WITH_PROBLEMS",
      "BARELY_WORKS",
      "DOES_NOT_WORK",
      "PHYSICALLY_DAMAGED",
    ])
    .optional(),

  userIntent: z
    .enum(["KEEP_USING", "REPAIR", "SELL_OR_DONATE", "RECYCLE", "NOT_SURE"])
    .optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = assessmentSchema.safeParse(body);

    if (!result.success) {
      console.error("Assessment validation failed:", result.error.flatten());

      return NextResponse.json(
        {
          success: false,
          error: "Invalid assessment data",
          details: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const data = result.data;

    const user = await prisma.user.upsert({
      where: {
        email: data.userEmail,
      },
      update: {
        name: data.userName,
      },
      create: {
        email: data.userEmail,
        name: data.userName,
      },
    });

    const device = await prisma.device.create({
      data: {
        userId: user.id,
        type: data.device.type,
        brand: data.device.brand,
        model: data.device.model,
        purchaseYear: data.device.purchaseYear,
      },
    });

    const recommendation = generateRecommendation({
      deviceType: data.device.type,
      condition: data.condition,
      userIntent: data.userIntent,
    });

    const assessment = await prisma.assessment.create({
      data: {
        deviceId: device.id,
        condition: data.condition,
        userIntent: data.userIntent,
        problemDescription: data.problemDescription,
        status: "COMPLETED",
        completedAt: new Date(),

        recommendations: {
          create: {
            action: recommendation.action,
            priority: recommendation.priority,
            reason: recommendation.reason,
            dataSafetyRequired: recommendation.dataSafetyRequired,
          },
        },
      },
      include: {
        device: true,
        recommendations: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        assessment,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Assessment creation failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create assessment",
      },
      { status: 500 },
    );
  }
}
