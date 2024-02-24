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
import { WebformField, WebformFieldCheckboxes, WebformFieldTextarea } from "@/utils/drupal/webform";

type Props = {
    field: WebformField,
    variant?: TextFieldVariants,
}

const defaultVariant = "filled"

const setToLocalStorage = (name: string, value: string) => {
    console.log(name);
    console.log(value);
    if (typeof window !== 'undefined') {
        localStorage.setItem(`form-test-${name}`, value)
    }
}
const getToLocalStorage = (name: string) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(`form-test-${name}`) || ""
    }
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
    return <TextField
        label={field.title}
        className="bg-white"
        variant={variant}
        defaultValue={getToLocalStorage(field.title)}
        onChange={event => setToLocalStorage(field.title, event.target.value)}
    />
}

function textarea(field: WebformFieldTextarea, variant: TextFieldVariants) {
    return <TextField
        label={field.title}
        className="bg-white"
        variant={variant}
        multiline
        rows={field.rows ?? 4}
        defaultValue={getToLocalStorage(field.title)}
        onChange={event => setToLocalStorage(field.title, event.target.value)}
    />
}

function checkbox(field: WebformField, variant: TextFieldVariants) {
    return buildCheckbox(field.title, field.title);
}

function buildCheckbox(option: string, label: string) {
    return <FormControlLabel
        value={option}
        id={option}
        control={<Checkbox
            defaultChecked={(option === getToLocalStorage(option)) ? true : false}
            onChange={event => (option === getToLocalStorage(option)) ? setToLocalStorage(option, "") : setToLocalStorage(option, event.target.value)}
        />}
        label={label}
        labelPlacement="end"
    />

}

function checkboxes(field: WebformFieldCheckboxes, variant: TextFieldVariants) {
    let checkboxes = [];
    for (const option in field.options) {
        const text = field.options[option].split(" -- ");
        const label = text[1] ? `${text[0]} (${text[1]})` : text[0];
        const currentCheckbox = buildCheckbox(option, label);
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
