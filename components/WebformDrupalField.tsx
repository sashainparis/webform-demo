"use client"

import {
    TextField,
    TextFieldVariants,
    FormControlLabel,
    Checkbox,
    FormControl,
    FormLabel,
    FormGroup,
} from '@mui/material';
import { 
    WebformField, 
    WebformFieldCheckboxes,
    WebformFieldTextarea 
    } from "@/utils/drupal/webform_types";
import slugify from 'slugify';
import { setFieldToLocalStorage } from '@/utils/localstorage/webform_set';
import { getFieldFromLocalStorage } from '@/utils/localstorage/webform_get';

type Props = {
    field: WebformField,
    variant?: TextFieldVariants, 
    key: number,
}


export default function WebformDrupalField({ field }: Props) {
    return loadField(field);
}

function loadField(field: WebformField) {
    let rendered;
    switch (field?.type) {
        case 'textfield': rendered = textfield(field); break;
        case 'textarea': rendered = textarea(field); break;
        case 'email': rendered = email(field); break;
        case 'select': rendered = select(field); break;
        case 'checkbox': rendered = checkbox(field); break;
        //@ts-ignore
        case 'checkboxes': rendered = checkboxes(field); break;
        default: rendered = <></>
    }
    return (rendered);
}

function textfield(field: WebformField) {
    const slug = slugify(field.title);
    const form = field?.form ?? "";
    return <TextField
        label={field.title}
        className="bg-white"
        variant={field.variant}
        defaultValue={getFieldFromLocalStorage(slug, form)}
        onChange={event => setFieldToLocalStorage(form, slug, event.target.value)}
    />
}

function textarea(field: WebformFieldTextarea) {
    const slug = slugify(field.title);
    const form = field?.form ?? "";
    return <TextField
        label={field.title}
        className="bg-white"
        variant={field.variant}
        multiline
        rows={field.rows ?? 4}
        defaultValue={getFieldFromLocalStorage(slug, form)}
        onChange={event => setFieldToLocalStorage(form, slug, event.target.value)}
    />
}

function checkbox(field: WebformField) {
    const form = field?.form ?? "";
    return buildCheckbox(field.title, field.title, form);
}

function buildCheckbox(option: string, label: string, form: string, wrapper: string = "", key: number) {
    const slugWrapper = slugify(wrapper);
    const slugOption = slugify(option);
    const name = (wrapper) ? `${slugWrapper}--${slugOption}` : slugOption;
    return <FormControlLabel
        key={key}
        value={name}
        id={name}
        control={<Checkbox
            defaultChecked={(name === getFieldFromLocalStorage(name, form)) ? true : false}
            onChange={event => (
                name === getFieldFromLocalStorage(name, form)) 
                ? setFieldToLocalStorage(form, name, "") 
                : setFieldToLocalStorage(form, name, event.target.value)
            }
        />}
        label={label}
        labelPlacement="end"
    />
}

function checkboxes(field: WebformFieldCheckboxes) {
    let checkboxes = [];
    const form = field?.form ?? "";
    let i = 0
    for (const option in field.options) {
        const text = field.options[option].split(" -- ");
        const label = text[1] ? `${text[0]} (${text[1]})` : text[0];
        const currentCheckbox = buildCheckbox(option, label, form, field.title, i);
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
}

function select(field: WebformField) {
    return <TextField
        label={field.title}
        className="bg-white"
        variant={field.variant}
    />
}

function email(field: WebformField) {
    return textfield(field);
}
