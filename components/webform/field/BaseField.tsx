"use client"

import {
    WebformField,
} from "@/utils/drupal/webform_types";
import { fieldValue } from '../WebformDrupalField';


export type FieldProps = {
    field: WebformField,
}

// export type FieldsProps = {
//     field: WebformFieldWithOptions,
// }

export function isRequired(field: WebformField) {
    return field.required
}

export function isError(field: WebformField): boolean {
    const storedValue = fieldValue(field);
    console.log(storedValue);
    // if(field.required && storedValue.valueOf() === "") {
    //     return true;
    // }
    return false;
}

export function errorMsg(field: WebformField) {
    const storedValue = fieldValue(field);
    if(field.required && storedValue.valueOf() === "") {
        return "Ce champ est obligatoire";
    } else {
        return "";
    }
}
