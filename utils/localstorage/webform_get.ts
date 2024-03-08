

export const getFieldFromLocalStorage = (name: string, form: string, multi?: number) => {
    const values = getWebformFromLocalStorageById(form, multi);
    return values[name] ?? "";
}

export const getOptionFromLocalStorage = (option: string, name: string, form: string) => {
    const values = getWebformFromLocalStorage(form);
    return values[option][name] ?? "";
}

export const getWebformFromLocalStorage = (form: string, multi?: number) => {
    if (typeof window !== 'undefined') {
        if (multi) {
            const values = JSON.parse(localStorage.getItem(`form--${form}`) || "[]");
            return values;
        } else {
            return JSON.parse(localStorage.getItem(`form--${form}`) || "{}");
        }
    }
}

export const getWebformFromLocalStorageById = (form: string, multi?: number) => {
    let webforms = getWebformFromLocalStorage(form, multi);
    if (webforms && (multi || multi === 0)) {
        if (!(webforms[multi])) {
            webforms.push({});
        }
        return webforms[multi];
    }
    return webforms;
}
