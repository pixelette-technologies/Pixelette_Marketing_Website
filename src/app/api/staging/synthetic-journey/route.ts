import { NextRequest, NextResponse } from "next/server";
import {
  authoriseSyntheticStagingTrigger,
  executeSyntheticStagingFullJourney,
  readSyntheticStagingConfiguration,
  syntheticStagingEventId,
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
    const nowMs = Date.now();
    const result = await executeSyntheticStagingFullJourney({
      configuration,
      origin: request.nextUrl.origin,
      eventId: syntheticStagingEventId(configuration.triggerSecret, nowMs),
      nowMs,
    });
    if (!result.accepted) {
      return NextResponse.json({ error: "Synthetic staging receiver refused the journey" }, { status: 502, headers });
    }
    return NextResponse.json({
      ok: true,
      submissionId: result.submissionId,
      providerReceiptId: result.providerReceiptId,
      sourceReceiptStatus: result.sourceReceiptStatus,
      baselineNextAction: result.baselineNextAction,
      outcomeStatus: result.outcomeStatus,
      outcomeReturnStatus: result.outcomeReturnStatus,
      learnedNextAction: result.learnedNextAction,
      nextActionChanged: result.nextActionChanged,
      learningState: result.learningState,
      dataClassification: "synthetic-only",
      emailDispatched: false,
      realDataProcessed: false,
      publicAction: false,
      spend: false,
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
