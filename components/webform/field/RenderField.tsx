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
import { ReactElement, useEffect, useState } from "react";
import { FieldProps } from "./BaseField";


export const Field = (({ field }: FieldProps) => {
    return loadField(field);
})

export function loadField(field: WebformField): ReactElement {
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
