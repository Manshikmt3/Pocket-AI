import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: Partial<ResponseCookie>) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Silently ignore — cookies can't be set during Server Component rendering.
          // This is expected when Supabase refreshes tokens in a read-only context.
        }
      },
      remove(name: string, options: Partial<ResponseCookie>) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // Silently ignore — same as above.
        }
      },
    },
  });
}
