import { TextFieldVariants } from '@mui/material';

export type WebformValues = {
    [propName: string]: string |string[],
}

export type WebformElements = {
    [propName: string]: WebformField,
}

export type WebformFieldTextarea = WebformField & {
    "rows"?: number,
}

export type WebformFieldCheckboxes = WebformField & {
    "options": string[],
}

export type WebformField = {
    "type": string,
    "title": string,
    "required"?: boolean,
    "default_value"?: string,
    "placeholder"?: string,
    "form"?: string, 
    'key': number, 
    variant?: TextFieldVariants, 
}

export type WebformData = {
    description: string,
    elements: string,
    id: string,
    status: string,
    title: string,
    uuid: string,
}

export type WebformObject = {
    description: string,
    elements?: WebformElements,
    id: string,
    status: string,
    title: string,
    uuid: string,
}
