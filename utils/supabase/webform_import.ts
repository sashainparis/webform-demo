import { createClient } from "@/utils/supabase/client";
import { WebformValues } from "../drupal/webform_types";
import { setFieldToLocalStorage } from "../localstorage/webform_set";

export default async function importWebform(name: string, id: string) {
    const values = await loadWebform(name, id);
    const data: WebformValues = structValues(values);
    Object.keys(data).map((key: string) => {
        setFieldToLocalStorage(name, key, data[key])  
    })
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

function structValues(values: any): WebformValues {
    let data: WebformValues = {};
    Object.keys(values.data).map((name: string) => {
        if (typeof values.data[name] === 'object') {
            // @ts-ignore
            Object.values(values.data[name]).map((value: string) => {
                data = {
                    ...data,
                    [value]: value, 
                };
                })
        } else {
            data = {
                ...data,
                [name]: values.data[name], 
            };
        }
    });
    return data;
}
