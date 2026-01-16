import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/server/db";

export const dynamic = 'force-dynamic';

// Secret token to prevent unauthorized seeding (set in env or use default for demo)
const SEED_TOKEN = process.env.SEED_TOKEN || "gruenewald-seed-2024";

export async function POST(req: Request) {
  // Check authorization
  const authHeader = req.headers.get("authorization");
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || authHeader?.replace("Bearer ", "");

  if (token !== SEED_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "mail@davidwegener.de" }
    });

    if (existingAdmin) {
      return NextResponse.json({
        message: "Admin already exists",
        user: { id: existingAdmin.id, email: existingAdmin.email, tier: existingAdmin.tier }
      });
    }

    // Create admin user
    const passwordHash = await bcrypt.hash("admin", 12);

    const admin = await prisma.user.create({
      data: {
        email: "mail@davidwegener.de",
        name: "David Wegener",
        passwordHash,
        tier: "pro"
      }
    });

    // Create Pro subscription for admin
    await prisma.subscription.create({
      data: {
        userId: admin.id,
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
      }
    });

    // Seed frameworks if they don't exist
    const frameworks = [
      { key: "ISO_27001", name: "ISO 27001", description: "Information Security Management" },
      { key: "ISO_13485", name: "ISO 13485", description: "Medical Devices Quality Management" },
      { key: "EU_MDR", name: "EU MDR", description: "European Medical Device Regulation" },
      { key: "EU_GMP_ANNEX_11", name: "EU GMP Annex 11", description: "Computerised Systems in GMP" }
    ];

    for (const fw of frameworks) {
      await prisma.framework.upsert({
        where: { key: fw.key },
        update: {},
        create: fw
      });
    }

    return NextResponse.json({
      message: "Seed complete",
      user: { id: admin.id, email: admin.email, tier: admin.tier },
      frameworks: frameworks.length
    }, { status: 201 });

  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Also support GET for easy browser testing
export async function GET(req: Request) {
  return POST(req);
}
