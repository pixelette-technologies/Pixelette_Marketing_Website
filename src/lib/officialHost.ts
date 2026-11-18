/**
 * Apex + www only. Every other host (vercel.app, subdomains, localhost) is a
 * second copy of the site and must stay out of search indexes.
 */
export const OFFICIAL_HOSTS = new Set([
  "www.pixelettemarketing.com",
  "pixelettemarketing.com"
]);

export function isOfficialMarketingHost(host: string): boolean {
  const hostname = (host.split(":")[0] ?? "").toLowerCase();
  return OFFICIAL_HOSTS.has(hostname);
}
