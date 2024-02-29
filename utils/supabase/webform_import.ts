import { createClient } from "@/utils/supabase/client";

export default async function importWebform(name: string, id: string) {
    const data = await loadWebform(name, id);
    console.log(data);
}

export async function loadWebform(formId: string, id: string) {
    const supabase = createClient();
    const result = await supabase.from("dashboard")
        .select('data, created_at, id')
        .eq('form_id', formId)
        .eq('id', id)
        ;
    return result.data?.pop();
}
