"use client"

import {
    FormControlLabel,
    Checkbox,
    FormControl,
    FormLabel,
    FormGroup,
} from '@mui/material';
import slugify from 'slugify';
import { setFieldToLocalStorage, setOptionToLocalStorage } from '@/utils/localstorage/webform_set';
import { getFieldFromLocalStorage, getOptionFromLocalStorage } from '@/utils/localstorage/webform_get';
import { FieldProps } from './BaseField';


export const Field = (({ field }: FieldProps) => {
    const form = field?.form ?? "";
    const multi = field?.multi;
    return buildCheckbox(field.title, field.title, form, "", 0, multi);
})

export const Fields = (({ field }: FieldProps) => {
    let checkboxes = [];
    const form = field?.form ?? "";
    const multi = field?.multi;
    let i = 0
    for (const option in field.options) {
        // @ts-ignore
        const text = field.options[option].split(" -- ");
        const label = text[1] ? `${text[0]} (${text[1]})` : text[0];
        const currentCheckbox = buildCheckbox(option, label, form, field.title, i, multi);
        checkboxes.push(currentCheckbox);
        i++;
    }
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{field.title}</FormLabel>
            <FormGroup aria-label="position" className="py-0">
                {checkboxes}
            </FormGroup>
        </FormControl>
    )
})

function buildCheckbox(option: string, label: string, form: string, wrapper: string = "", key: number = 0, multi?: number) {
    const slugWrapper = slugify(wrapper);
    const name = slugify(option);
    let defaultValue;
    if (wrapper) {
        defaultValue = (name === getOptionFromLocalStorage(slugWrapper, name, form)) ? true : false;
    } else {
        defaultValue = (name === getFieldFromLocalStorage(name, form, multi)) ? true : false;
    }
    return <FormControlLabel
        key={key}
        value={name}
        id={name}
        control={<Checkbox
            defaultChecked={defaultValue}
            onChange={event => {
                if (wrapper) {
                    name === getOptionFromLocalStorage(slugWrapper, name, form)
                        ? setOptionToLocalStorage(form, slugWrapper, name, "")
                        : setOptionToLocalStorage(form, slugWrapper, name, event.target.value)
                } else {
                    name === getFieldFromLocalStorage(name, form, multi)
                        ? setFieldToLocalStorage(form, name, "", multi)
                        : setFieldToLocalStorage(form, name, event.target.value, multi)
                }
            }}
        />
        }
        label={label}
        labelPlacement="end"
    />
}
