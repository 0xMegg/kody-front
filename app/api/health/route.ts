import { proxyToBackend } from '@/lib/backend-proxy';

export async function GET(): Promise<Response> {
  return proxyToBackend('/health');
}
