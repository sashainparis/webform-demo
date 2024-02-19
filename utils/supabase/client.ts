import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    localStorage.getItem("supabase_url")!,
    localStorage.getItem("supabase_key")!,
  );
