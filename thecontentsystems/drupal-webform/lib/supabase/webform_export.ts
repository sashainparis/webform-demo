import { createClient } from "@/lib/supabase/client";
import { getWebformFromLocalStorage } from "../localstorage/webform_get";

export default async function exportWebform(form: string) {
    const data = getWebformFromLocalStorage(form); 
    const result = await saveWebform(form, data);
    console.log(result);
}

export async function saveWebform(form: string, data: any) {
    const supabase = createClient();
    return await supabase.from("dashboard").insert({ form_id: form, data: data });
}
