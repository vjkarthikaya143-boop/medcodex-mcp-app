import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Verification of n8n webhook secret
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.N8N_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized n8n trigger" }, { status: 401 });
    }

    // Mock processing of external workflow events
    if (payload.event === "claim_denied") {
      console.log(`[n8n] Auto-routing claim ${payload.claimId} to Senior Auditor Queue for secondary review.`);
      // Insert logic to update Prisma schema Queue
    }

    if (payload.event === "student_certified") {
      console.log(`[n8n] Triggering certificate generation and Zapier email dispatch for ${payload.studentId}.`);
    }

    return NextResponse.json({ success: true, processed: payload.event });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Webhook failure" }, { status: 500 });
  }
}
