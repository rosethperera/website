import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Null until real credentials are set — callers must check
// isSupabaseConfigured before using this rather than assuming it exists.
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;
