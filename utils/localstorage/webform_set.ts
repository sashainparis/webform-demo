import { WebformValues } from "../drupal/webform_types";
import { getWebformFromLocalStorage } from "./webform_get"

export const setFieldToLocalStorage = (form: string, name: string, value: string, multi?: number) => {
    if (multi) {
        let webforms = getWebformFromLocalStorage(form, multi);
        console.log(webforms);    
        let values = webforms[multi];
        console.log(values);
        values = {
            ...values,
            [name]: value,
        }
        console.log(values);
        webforms[multi] = values
        console.log(webforms);    
        setWebformToLocalStorage(form, webforms);
    } else {
        let values = getWebformFromLocalStorage(form);
        console.log(values);
            values = {
            ...values,
            [name]: value,
        }
        console.log(values);
        setWebformToLocalStorage(form, values);
    }
}

export const setOptionToLocalStorage = (form: string, option: string, name: string, value: string) => {
    let values = getWebformFromLocalStorage(form);
    console.log(values);
    values = {
        ...values,
        [option]: {
            ...values[option],
            [name]: value,
        }
    }
    console.log(values);
    setWebformToLocalStorage(form, values);
}

export const setWebformToLocalStorage = (form: string, values: WebformValues) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(`form--${form}`, JSON.stringify(values))
    }
}
