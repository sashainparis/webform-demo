import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    localStorage.getItem("supabase--url")!,
    localStorage.getItem("supabase--key")!,
  );
