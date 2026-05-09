// ---------------------------------------------------------------------------
// Server-only proxy utility — used inside Next.js Route Handlers
// ---------------------------------------------------------------------------
// This module is only imported from app/api/**/route.ts files, so it is
// automatically excluded from the client bundle by Next.js.

const DEFAULT_BACKEND_URL = 'http://localhost:4000';

function getBackendBaseUrl(): string {
  return process.env.BACKEND_BASE_URL || DEFAULT_BACKEND_URL;
}

/**
 * Proxy a request to the Fastify backend and return a Web Response.
 *
 * @param path  - Backend path (e.g. '/health')
 * @param init  - Optional RequestInit overrides (method, headers, body, etc.)
 * @returns       A standard Response that can be returned directly from a Route Handler
 */
export async function proxyToBackend(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const url = `${getBackendBaseUrl()}${path}`;

  try {
    const upstream = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });

    const body = await upstream.text();
    const contentType = upstream.headers.get('Content-Type') || 'application/json';

    return new Response(body, {
      status: upstream.status,
      headers: { 'Content-Type': contentType },
    });
  } catch {
    return Response.json(
      {
        ok: false,
        error: {
          code: 'PROXY_ERROR',
          message: `Failed to connect to backend at ${url}`,
        },
      },
      { status: 503 },
    );
  }
}
