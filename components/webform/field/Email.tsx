"use client"

import { FieldProps, errorMsg, isError, isRequired } from './BaseField';
import { WfTextField } from '.';


export const Field = (({ field }: FieldProps) => {
    return <WfTextField field={field} />
})
