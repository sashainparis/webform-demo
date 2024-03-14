"use client"

import {
    WebformField,
} from "@/utils/drupal/webform_types";
import slugify from 'slugify';
import { getFieldFromLocalStorage } from '@/utils/localstorage/webform_get';
import {
    WfCheckbox,
    WfCheckboxes,
    WfDate,
    WfEmail,
    WfLink,
    WfNumber,
    WfSelect,
    WfTextArea,
    WfTextField
} from '.';
import { useEffect } from "react";


export type FieldProps = {
    field: WebformField,
}

export const Field = (({field}: FieldProps) => { 

    // useEffect (() => {

    // },[])

    return (loadField(field))
})

function loadField(field: WebformField) {
    let rendered;
    switch (field?.type) {
        case 'textfield': rendered = <WfTextField field={field} />; break;
        case 'textarea': rendered = <WfTextArea field={field} />; break;
        case 'email': rendered = <WfEmail field={field} />; break;
        case 'select': rendered = <WfSelect field={field} />; break;
        case 'checkbox': rendered = <WfCheckbox field={field} />; break;
        case 'checkboxes': rendered = <WfCheckboxes field={field} />; break;
        case 'webform_link': rendered = <WfLink field={field} />; break;
        case 'number': rendered = <WfNumber field={field} />; break;
        case 'date': rendered = <WfDate field={field} />; break;
        default: rendered = <></>
    }
    return (rendered);
}

export function fieldValue(field: WebformField) {
    return getFieldFromLocalStorage(slugify(field.title), field?.form ?? "", field?.multi);
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
    if(field.required && storedValue.valueOf() === "") {
        return "Ce champ est obligatoire";
    } else {
        return "";
    }
}
