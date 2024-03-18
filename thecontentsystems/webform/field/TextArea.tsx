"use client"

import {
    TextField,
} from '@mui/material';
import slugify from 'slugify';
import { setFieldToLocalStorage } from '@/utils/localstorage/webform_set';
import { getFieldFromLocalStorage } from '@/utils/localstorage/webform_get';
import { FieldProps, fieldValue, isRequired, structField } from './BaseField';
import { useEffect, useState } from 'react';
import { loadField } from './RenderField';


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

    function testMin() {
        const storedValue = fieldValue(field).toString();
        if (field?.counter_minimum  && storedValue.length < field?.counter_minimum) {
            return true;
        }
        return false;
    }

    function testMax() {
        const storedValue = fieldValue(field).toString();
        if (field?.counter_maximum  && storedValue.length > field?.counter_maximum) {
            return true;
        }
        return false;
    }
    
    function isError(): boolean {
        return testMin() ||testMax();
    }
    
    function errorMsg() {
        const storedValue = fieldValue(field);
        if (field.required && storedValue.valueOf() === "") {
            return field.required_error;
        } else if (testMin()) {
            return field.counter_minimum_message;
        } else if (testMax()) {
            return field.counter_maximum_message;
        } else {
            return "";
        }
    }

    return <TextField  
        error={isError()}
        helperText={errorMsg()}
        label={field.title}
        required={isRequired(field)}
        className="bg-white"
        variant={field.variant}
        multiline
        rows={field.rows ?? 4}
        defaultValue={getFieldFromLocalStorage(slug, form, multi)}
        onChange={event => reloadField(event.target.value)}
    />
})

