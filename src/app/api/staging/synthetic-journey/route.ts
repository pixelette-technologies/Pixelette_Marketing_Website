import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  authoriseSyntheticStagingTrigger,
  executeSyntheticStagingJourney,
  readSyntheticStagingConfiguration,
} from "@/lib/syntheticStagingJourney";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Marketing-Data-Classification": "synthetic-only",
};

export async function POST(request: NextRequest) {
  try {
    const configuration = readSyntheticStagingConfiguration();
    authoriseSyntheticStagingTrigger(
      request.headers.get("x-marketing-staging-trigger"),
      configuration.triggerSecret,
    );
    const result = await executeSyntheticStagingJourney({
      configuration,
      origin: request.nextUrl.origin,
      eventId: randomUUID(),
      nowMs: Date.now(),
    });
    if (!result.accepted) {
      return NextResponse.json({ error: "Synthetic staging receiver refused the journey" }, { status: 502, headers });
    }
    return NextResponse.json({
      ok: true,
      submissionId: result.submissionId,
      providerReceiptId: result.providerReceiptId,
      dataClassification: "synthetic-only",
      emailDispatched: false,
      liveLearningApplied: false,
    }, { status: 200, headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : "SYNTHETIC_STAGING_REFUSED";
    const disabled = message === "SYNTHETIC_STAGING_DISABLED";
    const refused = message === "SYNTHETIC_STAGING_TRIGGER_REFUSED";
    return NextResponse.json(
      { error: disabled ? "Synthetic staging is disabled" : refused ? "Synthetic staging trigger refused" : "Synthetic staging is unavailable" },
      { status: disabled ? 404 : refused ? 401 : 503, headers },
    );
  }
}
