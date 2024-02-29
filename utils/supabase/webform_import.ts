import { createClient } from "@/utils/supabase/client";

export default async function importWebform(formId: string, id: string) {
    const supabase = createClient();
    const result = await supabase.from("dashboard")
        .select('data, created_at, id')
        .eq('form_id', formId)
        .eq('id', id)
        ;
}

export async function listImportWebform(formId: string) {
    const supabase = createClient();
    const { data: dashboard } = await supabase.from("dashboard")
        .select()
        .eq('form_id', formId)
        .order('created_at', { ascending: false })
        .limit(10)
        ;
    return dashboard;
}
