"use client"

import { WebformField } from '@/utils/drupal/webform_types';
import { WfTextField } from '.';
import { FieldProps, fieldValue } from './BaseField';

export function isError(field: WebformField): boolean {
    const storedValue = fieldValue(field).toString();
    console.log(storedValue);
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(storedValue)) {
        return true;
    }
    return false;
}

export const Field = (({ field }: FieldProps) => {
    console.log(field);
    return <WfTextField field={field} />
})
