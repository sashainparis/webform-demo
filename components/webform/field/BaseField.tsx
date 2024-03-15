"use client"

import {
    WebformField,
} from "@/utils/drupal/webform_types";
import slugify from 'slugify';
import { getFieldFromLocalStorage } from '@/utils/localstorage/webform_get';
import { ChangeEventHandler, ReactEventHandler } from "react";


export type FieldProps = {
    field: WebformField,
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
}

export function fieldValue(field: WebformField) {
    return getFieldFromLocalStorage(slugify(field.title), field?.form ?? "", field?.multi);
}

export function structField (field: WebformField) {
    return {
        slug: slugify(field.title), 
        form: field?.form ?? "", 
        multi: field?.multi,
    }
}

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
    if (field.required && storedValue.valueOf() === "") {
        return "Ce champ est obligatoire";
    } else {
        return "";
    }
}
