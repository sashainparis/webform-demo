"use client"

import {
    TextField,
} from '@mui/material';
import { setFieldToLocalStorage } from '@/utils/localstorage/webform_set';
import { getFieldFromLocalStorage } from '@/utils/localstorage/webform_get';
import { loadField } from './RenderField';
import { FieldProps, fieldValue, isRequired, structField } from './BaseField';
import { useEffect, useState } from 'react';


export const Field = (({ field }: FieldProps) => {
    const [item, setItem] = useState(field);
    const { slug, form, multi} = structField(field);

    useEffect(() => {
        loadField(field)
    }, [setItem])

    function testValue() {
        const storedValue = fieldValue(field).toString();
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(storedValue)) {
            return true;
        }
        return false;
    }
    
    function isError(): boolean {
        return testValue();
    }
    
    function errorMsg() {
        const storedValue = fieldValue(field);
        if (field.required && storedValue.valueOf() === "") {
            return "Ce champ est obligatoire";
        } else if (testValue()) {
            return "Le format du mail n'est pas valide";
        } else {
            return "";
        }
    }

    function reloadField(
        value: string,
    ) {
        setFieldToLocalStorage(form, slug, value, multi)
        setItem({...field})
    }

    return <TextField
        error={isError()}
        helperText={errorMsg()}
        label={field.title}
        required={isRequired(field)}
        placeholder={field.placeholder}
        className="bg-white"
        variant={field.variant}
        defaultValue={getFieldFromLocalStorage(slug, form, multi)}
        onChange={event => reloadField(event.target.value)}
    />
})
