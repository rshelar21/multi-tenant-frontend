// lib/serverQueryClient.ts
import { QueryClient } from '@tanstack/react-query';

export function createServerQueryClient() {
  return new QueryClient();
}
