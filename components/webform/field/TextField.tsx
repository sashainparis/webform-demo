"use client"

import {
    TextField,
} from '@mui/material';
import { setFieldToLocalStorage } from '@/utils/localstorage/webform_set';
import { getFieldFromLocalStorage } from '@/utils/localstorage/webform_get';
import { loadField } from './RenderField';
import { FieldProps, errorMsg, isError, isRequired, structField } from './BaseField';
import { useEffect, useState } from 'react';


export const Field = (({ field }: FieldProps) => {
    const [item, setItem] = useState(field);
    const { slug, form, multi} = structField(field);

    useEffect(() => {
        loadField(field)
    }, [setItem])

    function reloadField(
        value: string,
    ) {
        setFieldToLocalStorage(form, slug, value, multi)
        setItem({...field})
    }

    return <TextField
        error={isError(field)}
        helperText={errorMsg(field)}
        label={field.title}
        required={isRequired(field)}
        placeholder={field.placeholder}
        className="bg-white"
        variant={field.variant}
        defaultValue={getFieldFromLocalStorage(slug, form, multi)}
        onChange={event => reloadField(event.target.value)}
    />
})
