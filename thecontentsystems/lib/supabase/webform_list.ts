import { createClient } from "@/lib/supabase/client";

export async function listImportWebform(name: string) {
    const supabase = createClient();
    const { data: dashboard } = await supabase.from("dashboard")
        .select()
        .eq('form_id', name)
        .order('created_at', { ascending: false })
        .limit(10)
        ;
    return dashboard;
}
