import { MultiWebform, MultiWebformValues, WebformValues, WebformsValues } from "../drupal/webform_types";


export const getFieldFromLocalStorage = (name: string, form: string, multi?: number) => {
    let values: WebformsValues|undefined;
    if (multi) {
        values = getMultiWebformFromLocalStorageById(form, multi);
    } else {
        values = getWebformFromLocalStorageById(form);        
    }

    // @ts-ignore
    if (values && values[name]) {
        // @ts-ignore
        return values[name];
    }
    return "";
}

export const getOptionFromLocalStorage = (option: string, name: string, form: string): string => {
    const values: WebformsValues = getWebformFromLocalStorage(form);
    // @ts-ignore
    if (values && values[option]) {
        // @ts-ignore
        return values[option][name] ?? "";
    }
    return "";
}

export const getWebformFromLocalStorage = (form: string, multi?: number): WebformsValues => {
    if (typeof window !== 'undefined') {
        if (multi) {
            const values: MultiWebformValues = JSON.parse(localStorage.getItem(`form--${form}`) || "[]");
            return values;
        } else {
            return JSON.parse(localStorage.getItem(`form--${form}`) || "{}");
        }
    }
    return {};
}

export const getMultiWebformFromLocalStorageOther = (form: string, multi?: number): MultiWebformValues => {
    // @ts-ignore
    const webforms: MultiWebformValues = getWebformFromLocalStorage(form, multi);
    return webforms.filter((webform: MultiWebform) => (webform.id !== multi));
}

export const getMultiWebformFromLocalStorageById = (form: string, multi?: number): MultiWebform | undefined => {
    // @ts-ignore
    const webforms: MultiWebformValues = getWebformFromLocalStorage(form, multi);
    return webforms.filter((webform: MultiWebform) => (webform.id === multi)).pop();
}

export const getWebformFromLocalStorageById = (form: string): WebformValues => {
    // @ts-ignore
    let webforms: WebformValues = getWebformFromLocalStorage(form);
    return webforms;
}
