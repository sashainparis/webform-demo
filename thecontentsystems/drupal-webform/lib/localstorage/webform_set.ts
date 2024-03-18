import { MultiWebform, MultiWebformValues, WebformsValues } from "../drupal/webform_types";
import { getMultiWebformFromLocalStorageById, getMultiWebformFromLocalStorageOther, getWebformFromLocalStorage, getWebformFromLocalStorageById } from "./webform_get"

export const setFieldToLocalStorage = (form: string, name: string, value: string, multi?: number) => {
    if (multi || multi === 0) {
        // @ts-ignore
        let webforms: MultiWebformValues = getMultiWebformFromLocalStorageOther(form, multi);
        // @ts-ignore
        let values: MultiWebform = getMultiWebformFromLocalStorageById(form, multi) ?? {id: multi};
        if (values) {
            values = {
                ...values,
                [name]: value,
            }
            webforms.push(values);
        }
        setWebformToLocalStorage(form, webforms);
    } else {
        let values = getWebformFromLocalStorage(form);
        values = {
            ...values,
            [name]: value,
        }
        setWebformToLocalStorage(form, values);
    }
}

export const setOptionToLocalStorage = (form: string, option: string, name: string, value: string) => {
    let values = getWebformFromLocalStorage(form);
    values = {
        ...values,
        [option]: {
            // @ts-ignore
            ...values[option],
            [name]: value,
        }
    }
    setWebformToLocalStorage(form, values);
}

export const setWebformToLocalStorage = (form: string, values: WebformsValues) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(`form--${form}`, JSON.stringify(values))
    }
}
