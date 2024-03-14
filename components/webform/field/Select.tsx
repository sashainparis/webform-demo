"use client"

import { FieldProps } from './BaseField';
import { WfTextField } from '.';


export const Field = (({ field }: FieldProps) => {
    return <WfTextField field={field} />
})
