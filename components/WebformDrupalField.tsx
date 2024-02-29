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

type Props = {
    field: WebformField,
    variant?: TextFieldVariants,
}

const defaultVariant = "filled"

const setToLocalStorage = (name: string, form: string, value: string) => {
    console.log(name);
    console.log(value);
    if (typeof window !== 'undefined') {
        localStorage.setItem(`form--${form}--${name}`, value)
    }
}

export const getToLocalStorage = (name: string, form: string) => {
    console.log(localStorage.key);
    if (typeof window !== 'undefined') {
        return localStorage.getItem(`form--${form}--${name}`) || ""
    }
}

export const getToLocalStorageByForm = (formName: string) => {
    let i;
    let results = {};
    for (i in localStorage) {
        if (localStorage.hasOwnProperty(i)) {
            if (i.match(formName) && localStorage.getItem(i)) {
                results = {
                    ...results,
                    [i]: localStorage.getItem(i),
                }
            }
        }
    }
    return results;
}

function loadField(field: WebformField, variant: TextFieldVariants = defaultVariant) {
    let rendered;
    switch (field?.type) {
        case 'textfield': rendered = textfield(field, variant); break;
        case 'textarea': rendered = textarea(field, variant); break;
        case 'email': rendered = email(field, variant); break;
        case 'select': rendered = select(field, variant); break;
        case 'checkbox': rendered = checkbox(field, variant); break;
        //@ts-ignore
        case 'checkboxes': rendered = checkboxes(field, variant); break;
        default: rendered = <></>
    }
    return rendered
}

function textfield(field: WebformField, variant: TextFieldVariants) {
    const slug = slugify(field.title);
    const form = field?.form ?? "";
    return <TextField
        label={field.title}
        className="bg-white"
        variant={variant}
        defaultValue={getToLocalStorage(slug, form)}
        onChange={event => setToLocalStorage(slug, form, event.target.value)}
    />
}

function textarea(field: WebformFieldTextarea, variant: TextFieldVariants) {
    const slug = slugify(field.title);
    const form = field?.form ?? "";
    return <TextField
        label={field.title}
        className="bg-white"
        variant={variant}
        multiline
        rows={field.rows ?? 4}
        defaultValue={getToLocalStorage(slug, form)}
        onChange={event => setToLocalStorage(slug, form, event.target.value)}
    />
}

function checkbox(field: WebformField, variant: TextFieldVariants) {
    const form = field?.form ?? "";
    return buildCheckbox(field.title, field.title, form);
}

function buildCheckbox(option: string, label: string, form: string, wrapper: string = "") {
    const slugWrapper = slugify(wrapper);
    const slugOption = slugify(option);
    const name = (wrapper) ? `${slugWrapper}--${slugOption}` : slugOption;
    return <FormControlLabel
        value={name}
        id={name}
        control={<Checkbox
            defaultChecked={(name === getToLocalStorage(name, form)) ? true : false}
            onChange={event => (name === getToLocalStorage(name, form)) ? setToLocalStorage(name, form, "") : setToLocalStorage(name, form, event.target.value)}
        />}
        label={label}
        labelPlacement="end"
    />

}

function checkboxes(field: WebformFieldCheckboxes, variant: TextFieldVariants) {
    let checkboxes = [];
    const form = field?.form ?? "";
    for (const option in field.options) {
        const text = field.options[option].split(" -- ");
        const label = text[1] ? `${text[0]} (${text[1]})` : text[0];
        const currentCheckbox = buildCheckbox(option, label, form, field.title);
        checkboxes.push(currentCheckbox);
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

function select(field: WebformField, variant: TextFieldVariants) {
    return <TextField
        label={field.title}
        className="bg-white"
        variant={variant}
    />
}

function email(field: WebformField, variant: TextFieldVariants) {
    return textfield(field, variant);
}

export default function WebformDrupalField({ field, variant = defaultVariant }: Props) {
    return loadField(field, variant);
}
