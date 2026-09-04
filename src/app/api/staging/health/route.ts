import { NextResponse } from "next/server";
import { checkSyntheticStagingHealth } from "@/lib/syntheticStagingHealth";
import { readSyntheticStagingConfiguration } from "@/lib/syntheticStagingJourney";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Marketing-Data-Classification": "synthetic-only",
};

function healthFailureCode(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  if (/^SYNTHETIC_STAGING_HEALTH_[A-Z0-9_]+$/.test(message)) return message;
  if (/^SYNTHETIC_STAGING_CONFIGURATION_[A-Z0-9_:]+$/.test(message)) {
    return "SYNTHETIC_STAGING_HEALTH_CONFIGURATION_INVALID";
  }
  if (message === "SYNTHETIC_STAGING_DISABLED") return message;
  return "SYNTHETIC_STAGING_HEALTH_UNAVAILABLE";
}

export async function GET() {
  try {
    const configuration = readSyntheticStagingConfiguration();
    const health = await checkSyntheticStagingHealth({ configuration });
    return NextResponse.json({
      ok: true,
      receiverReady: health.ready,
      receiverSchemaVersion: health.schemaVersion,
      receiverPackageManifestSha256: health.packageManifestSha256,
      dataClassification: "synthetic-only",
      emailDispatched: false,
      realDataProcessed: false,
      publicAction: false,
      spend: false,
      liveLearningApplied: false,
    }, { status: 200, headers });
  } catch (error) {
    const failureCode = healthFailureCode(error);
    const disabled = failureCode === "SYNTHETIC_STAGING_DISABLED";
    return NextResponse.json(
      {
        error: disabled ? "Synthetic staging is disabled" : "Synthetic staging health is unavailable",
        failureCode,
      },
      { status: disabled ? 404 : 503, headers },
    );
  }
}
