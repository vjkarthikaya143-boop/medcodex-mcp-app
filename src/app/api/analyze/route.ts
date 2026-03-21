import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    // Mock NLP Processing Delay to simulate real AI Inference
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple deterministic mock logic based on keywords
    const suggestions = [];

    if (text.toLowerCase().includes("diabetes") && text.toLowerCase().includes("neuropathy")) {
      suggestions.push({
        id: "1",
        code: "E11.40",
        type: "ICD-10",
        description: "Type 2 diabetes mellitus with diabetic neuropathy, unspecified",
        confidence: 0.98,
        justification: "Clinical Note states 'Type 2 DM w/ Neuropathy'",
      });
    }

    if (text.toLowerCase().includes("pain")) {
      suggestions.push({
        id: "2",
        code: "G62.9",
        type: "ICD-10",
        description: "Polyneuropathy, unspecified",
        confidence: 0.82,
        justification: "Patient presented with severe neuropathic pain",
      });
    }

    // Always append an E/M visit code if no other CPT is present
    suggestions.push({
      id: "3",
      code: "99213",
      type: "CPT",
      description: "Office or other outpatient visit, established patient",
      confidence: 0.94,
      justification: "Established patient, moderate Medical Decision Making level",
    });

    return NextResponse.json({ success: true, suggestions });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Failed to process text" }, { status: 500 });
  }
}
