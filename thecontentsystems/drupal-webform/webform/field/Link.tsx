"use client"

import {
    FormControl,
    TextField,
} from '@mui/material';
import slugify from 'slugify';
import { setFieldToLocalStorage } from '@/lib/localstorage/webform_set';
import { getFieldFromLocalStorage } from '@/lib/localstorage/webform_get';
import { FieldProps } from './BaseField';
import { WebformField } from '@/lib/drupal/webform_types';


export const Field = (({ field }: FieldProps) => {
    let links;
    if (field.multiple) {
        links = [1, 2, 3].map(key => buildUrl(field, key))
    } else {
        links = buildUrl(field);
    }
    return (
        <FormControl component="fieldset">
            <h3>{field.title}</h3>
            {links}
        </FormControl>
    )
})

function buildUrl(field: WebformField, key?: number) {
    const form = field?.form ?? "";
    const slug = (key) ? slugify(`${field.title} ${key}`) : slugify(field.title);
    const multi = field?.multi;
    return (
        <TextField
            key={key}
            label="URL"
            className="bg-white"
            variant={field.variant}
            defaultValue={getFieldFromLocalStorage(slug, form, multi)}
            onChange={event => setFieldToLocalStorage(form, slug, event.target.value, multi)}
        />
    )
}
