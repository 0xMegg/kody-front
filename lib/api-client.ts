// ---------------------------------------------------------------------------
// Typed API Client — calls Next.js Route Handlers (/api/...) from the browser
// ---------------------------------------------------------------------------

// Response types (mirrors backend ApiResponse shape, defined independently)
export interface ApiSuccessResponse<T> {
  ok: true;
  data: T;
}

export interface ApiErrorResponse {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ---------------------------------------------------------------------------
// Error class
// ---------------------------------------------------------------------------

export class ApiClientError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

// ---------------------------------------------------------------------------
// Internal fetch helper
// ---------------------------------------------------------------------------

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  let res: Response;

  try {
    res = await fetch(path, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });
  } catch (err) {
    throw new ApiClientError(
      'NETWORK_ERROR',
      err instanceof Error ? err.message : 'Network request failed',
      0,
    );
  }

  const body: ApiResponse<T> = await res.json();

  if (!body.ok) {
    throw new ApiClientError(
      body.error.code,
      body.error.message,
      res.status,
    );
  }

  return body.data;
}

// ---------------------------------------------------------------------------
// Public API client
// ---------------------------------------------------------------------------

export const apiClient = {
  get<T>(path: string): Promise<T> {
    return request<T>(path, { method: 'GET' });
  },

  post<T>(path: string, body: unknown): Promise<T> {
    return request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put<T>(path: string, body: unknown): Promise<T> {
    return request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  del<T>(path: string): Promise<T> {
    return request<T>(path, { method: 'DELETE' });
  },
};

// ---------------------------------------------------------------------------
// Env helper
// ---------------------------------------------------------------------------

export function useRealApi(): boolean {
  return process.env.NEXT_PUBLIC_USE_REAL_API === 'true';
}
