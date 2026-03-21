import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const fhirResource = await req.json();

    if (fhirResource.resourceType !== "Encounter") {
      return NextResponse.json(
        { success: false, issue: [{ severity: "error", code: "invalid", diagnostics: "Expected an Encounter resource" }] },
        { status: 400 }
      );
    }

    // Mock FHIR ingestion response
    return NextResponse.json({
      resourceType: "OperationOutcome",
      issue: [
        {
          severity: "information",
          code: "informational",
          diagnostics: `Successfully ingested Encounter ${fhirResource.id || 'unknown'} and queued for AI Coding.`
        }
      ]
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, issue: [{ severity: "fatal", code: "exception", diagnostics: "Internal server error processing FHIR payload" }] },
      { status: 500 }
    );
  }
}
