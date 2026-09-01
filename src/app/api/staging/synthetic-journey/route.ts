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

function stagingFailureCode(error: unknown): string {
  const errorRecord = typeof error === "object" && error !== null
    ? error as { message?: unknown; name?: unknown; cause?: unknown }
    : undefined;
  const message = typeof errorRecord?.message === "string" ? errorRecord.message : "";
  const name = typeof errorRecord?.name === "string" ? errorRecord.name : "";
  if (/^SYNTHETIC_[A-Z0-9_:]+$/.test(message)) return message;
  if (/^MARKETING_BD_[A-Z0-9_]+$/.test(message)) {
    return `SYNTHETIC_STAGING_CONFIGURATION_${message}`;
  }
  const cause = errorRecord?.cause;
  if (typeof cause === "object" && cause !== null && "code" in cause) {
    const code = String((cause as { code?: unknown }).code ?? "");
    if (/^[A-Z0-9_]+$/.test(code)) return `SYNTHETIC_STAGING_NETWORK_${code}`;
  }
  if (name === "TimeoutError" || name === "AbortError") {
    return "SYNTHETIC_STAGING_NETWORK_TIMEOUT";
  }
  if (message === "fetch failed") return "SYNTHETIC_STAGING_NETWORK_FETCH_FAILED";
  return "SYNTHETIC_STAGING_UNCLASSIFIED_FAILURE";
}

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
    const failureCode = stagingFailureCode(error);
    const disabled = message === "SYNTHETIC_STAGING_DISABLED";
    const refused = message === "SYNTHETIC_STAGING_TRIGGER_REFUSED";
    return NextResponse.json(
      {
        error: disabled ? "Synthetic staging is disabled" : refused ? "Synthetic staging trigger refused" : "Synthetic staging is unavailable",
        failureCode,
      },
      { status: disabled ? 404 : refused ? 401 : 503, headers },
    );
  }
}
