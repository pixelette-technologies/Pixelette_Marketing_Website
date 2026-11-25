// /results was retired. 410 tells clients the page is gone. No redirect.

export function GET() {
  return new Response("Gone", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
