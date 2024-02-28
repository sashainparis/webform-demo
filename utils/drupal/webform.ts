import { getToLocalStorageByForm } from "@/components/WebformDrupalField";
import { createClient } from "@/utils/supabase/client";


export type WebformElements = {
    [propName: string]: WebformField,
}

export type WebformFieldTextarea = WebformField & {
    "rows"?: number,
}

export type WebformFieldCheckboxes = WebformField & {
    "options": string[],
}

export type WebformField = {
    "type": string,
    "title": string,
    "required"?: boolean,
    "default_value"?: string,
    "placeholder"?: string,
    "form"?: string,
}

export type WebformData = {
    description: string,
    elements: string,
    id: string,
    status: string,
    title: string,
    uuid: string,
}

export type WebformObject = {
    description: string,
    elements?: WebformElements,
    id: string,
    status: string,
    title: string,
    uuid: string,
}


function getFetchOptions(): RequestInit {
    return {
        cache: "no-cache",
        headers: { "api-key": 'cb7a3c8705bee616306a337de4543b97' }
    };
}

function getServiceUrl(bundle: string) {
    return `https://account.octopusceo.com/sysapi/webform/${bundle}`;
}

function normalizeWebform(id: string, uuid: string, webform: any) {
    return {
        id: id,
        uuid: uuid,
        title: webform.title,
        description: webform.description,
        status: webform.status,
        confirmation: {
            type: webform.settings.confirmation_type,
            url: webform.settings.confirmation_url,
            message: webform.settings.confirmation_message,
        },
        elements: webform.elements,
    };
}

export async function loadWebform(id: string) {
    const data = await fetchWebforms();
    data.data = data.data.filter((datum: any) => (datum.id === id)).pop();
    return normalizeWebform(data.data.attributes.drupal_internal__id, id, data.data.attributes);
}

export async function loadWebformByName(name: string) {
    const data = await fetchWebforms();
    data.data = data.data.filter((datum: any) => (datum.attributes.drupal_internal__id === name)).pop();
    return normalizeWebform(name, data.data.id, data.data.attributes);
}

export async function fetchWebforms() {
    const url = getServiceUrl('webform');
    const res = await fetch(url, getFetchOptions());
    let data = await res.json();
    // data.data = data.data.filter((datum: any) => (datum.attributes.field_disabled === false))
    return data;
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

export async function importWebform(formId: string, id: string) {
    const supabase = createClient();
    const result = await supabase.from("dashboard")
        .select('data, created_at, id')
        .eq('form_id', formId)
        .eq('id', id)
        ;
    console.log(result);
}

export async function saveWebform(formId: string) {
    console.log("--- SAVE Webform ---");
    const form = `form--${formId}`;
    const values = getToLocalStorageByForm(form);
    console.log(values);
    let data: any = {};
    Object.keys(values).map((name: string) => {
        const tree = name.split("--");
        console.log(tree);
        const key1 = tree[2] ?? "";
        const key2 = tree[3] ?? "";
        const key3 = tree[4] ?? "";
        const key4 = tree[5] ?? "";

        const max = tree.length - 2;
        for (let i = 0; i <= max; i++) {
            if (i === max) {
                const key = tree[i - 1];
                // @ts-ignore
                const value = values[name];
                console.log(value);
                switch (max) {
                    case 1:
                        data[key1] = value;
                        break;
                    case 2:
                        data[key1][key2] = value;
                        break;
                    case 3:
                        data[key1][key2][key3] = value;
                        break;
                    case 4:
                        data[key1][key2][key3][key4] = value;
                }
            }
            else if (i === 0 && !data[key1]) {
                data = {
                    ...data,
                    [key1]: {},
                }
            }
            else if (i === 1 && !data[key1][key2]) {
                data[key1] = {
                    ...data[key1],
                    [key2]: {},
                }
            }
            else if (i === 2 && !data[key1][key2][key3]) {
                data[key1][key2] = {
                    ...data[key1][key2],
                    [key3]: {},
                }
            }
            else if (i === 3 && data[key1][key2][key3][key4]) {
                data[key1][key2][key3] = {
                    ...data[key1][key2][key3],
                    [key4]: {},
                }
            }
        }
    })
    console.log(data);

    const supabase = createClient();
    const result = await supabase.from("dashboard").insert({ form_id: formId, data: data });
    console.log(result);
}

