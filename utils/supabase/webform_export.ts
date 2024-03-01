import { createClient } from "@/utils/supabase/client";
import { getWebformFromLocalStorageByName } from "../localstorage/webform_get";

export default async function exportWebform(formId: string) {
    const form = `form--${formId}`;
    const values = getWebformFromLocalStorageByName(form); 
    const data = structValues(values);
    const result = await saveWebform(formId, data);
    console.log(result);
}

export async function saveWebform(formId: string, data: any) {
    const supabase = createClient();
    return await supabase.from("dashboard").insert({ form_id: formId, data: data });
}

function structValues(values: any) {
    let data: any = {};
    Object.keys(values).map((name: string) => {
        const tree = name.split("--");
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
    return data;
}
