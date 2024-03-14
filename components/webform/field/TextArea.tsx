"use client"

import {
    TextField,
} from '@mui/material';
import slugify from 'slugify';
import { setFieldToLocalStorage } from '@/utils/localstorage/webform_set';
import { getFieldFromLocalStorage } from '@/utils/localstorage/webform_get';
import { FieldProps, errorMsg, isError, isRequired } from './BaseField';


export const Field = (({ field }: FieldProps) => {
    console.log(field);
    const slug = slugify(field.title);
    const form = field?.form ?? "";
    const multi = field?.multi;
    return <TextField  
        error={isError(field)}
        helperText={errorMsg(field)}
        label={field.title}
        required={isRequired(field)}
        className="bg-white"
        variant={field.variant}
        multiline
        rows={field.rows ?? 4}
        defaultValue={getFieldFromLocalStorage(slug, form, multi)}
        onChange={event => setFieldToLocalStorage(form, slug, event.target.value, multi)}
    />
})

