import { createClient } from "@/utils/supabase/client";
import { WebformValues } from "../drupal/webform_types";
import { setWebformToLocalStorage } from "../localstorage/webform_set";

export default async function importWebform(name: string, id: string) {
    const values = await loadWebform(name, id);
    const data: WebformValues = values?.data;
    setWebformToLocalStorage(name, data);
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

// function structValues(values: any): WebformValues {
//     let data: WebformValues = values.data;
//     return data;
// }
