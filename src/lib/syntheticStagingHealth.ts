import type { SyntheticStagingConfiguration } from "./syntheticStagingJourney.ts";

const MANIFEST_SHA256 = /^[0-9a-f]{64}$/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function syntheticStagingHealthEndpoint(sourceEndpoint: string): string {
  const endpoint = new URL(sourceEndpoint);
  if (
    endpoint.protocol !== "https:"
    || endpoint.username
    || endpoint.password
    || endpoint.search
    || endpoint.hash
    || !endpoint.pathname.endsWith("/v1/source-submissions")
  ) {
    throw new Error("SYNTHETIC_STAGING_HEALTH_ENDPOINT_INVALID");
  }
  endpoint.pathname = endpoint.pathname.replace(/\/v1\/source-submissions$/, "/healthz");
  return endpoint.toString();
}

export interface SyntheticStagingHealthResult {
  ready: true;
  schemaVersion: string;
  packageManifestSha256: string;
}

export async function checkSyntheticStagingHealth(options: {
  configuration: SyntheticStagingConfiguration;
  fetchImpl?: typeof fetch;
}): Promise<SyntheticStagingHealthResult> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const response = await fetchImpl(
    syntheticStagingHealthEndpoint(options.configuration.transport.endpoint),
    {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    },
  );
  if (
    response.status !== 200
    || response.headers.get("cache-control") !== "no-store"
    || response.headers.get("x-marketing-data-classification") !== "synthetic-only"
    || !response.headers.get("content-type")?.toLowerCase().startsWith("application/json")
  ) {
    throw new Error("SYNTHETIC_STAGING_HEALTH_RESPONSE_REFUSED");
  }
  const body = await response.json() as unknown;
  if (!isRecord(body)) throw new Error("SYNTHETIC_STAGING_HEALTH_RESPONSE_INVALID");
  const schemaVersion = String(body.schema_version ?? "");
  const packageManifestSha256 = String(body.package_manifest_sha256 ?? "");
  if (
    body.status !== "ready"
    || body.data_classification !== "synthetic-only"
    || body.package_manifest_attested !== true
    || !schemaVersion
    || !MANIFEST_SHA256.test(packageManifestSha256)
  ) {
    throw new Error("SYNTHETIC_STAGING_HEALTH_ATTESTATION_INVALID");
  }
  return {
    ready: true,
    schemaVersion,
    packageManifestSha256: packageManifestSha256.toUpperCase(),
  };
}
