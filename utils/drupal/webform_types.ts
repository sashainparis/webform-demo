import { TextFieldVariants } from '@mui/material';

export type WebformsValues = MultiWebformValues | WebformValues;

export type MultiWebformValues = MultiWebform[];

export type MultiWebform = WebformValues & {
    id: number,
}

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
    "key": number, 
    "variant"?: TextFieldVariants, 
    "multiple"?: boolean,
    "multi"?: number,
}

export type WebformConfirmation = {
    type: string,
    url: string,
    message: string,
}

export type WebformData = {
    id: string,
    uuid: string,
    title: string,
    description: string,
    status: string,
    confirmation: WebformConfirmation,
    elements: string,
}

export type WebformObject = {
    description: string,
    elements?: WebformElements,
    id: string,
    status: string,
    title: string,
    uuid: string,
}
