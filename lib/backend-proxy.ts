// ---------------------------------------------------------------------------
// Server-only proxy utility for Next.js Route Handlers.
// Forwards requests to the backend API and returns a consistent response.
// ---------------------------------------------------------------------------

const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL || 'http://localhost:4000';

export async function proxyToBackend(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const url = `${BACKEND_BASE_URL}${path}`;

  let res: Response;

  try {
    res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });
  } catch {
    return Response.json(
      {
        ok: false,
        error: {
          code: 'PROXY_ERROR',
          message: `Backend unreachable at ${url}`,
        },
      },
      { status: 503 },
    );
  }

  const contentType = res.headers.get('content-type') || 'application/json';
  const body = await res.text();

  return new Response(body, {
    status: res.status,
    headers: { 'Content-Type': contentType },
  });
}
