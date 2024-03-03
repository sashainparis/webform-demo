

export const getFieldFromLocalStorage = (name: string, form: string) => {
    const values = getWebformFromLocalStorage(form);
    return values[name] ?? "";
}

export const getOptionFromLocalStorage = (option: string, name: string, form: string) => {
    const values = getWebformFromLocalStorage(form);
    return values[option][name] ?? "";
}

export const getWebformFromLocalStorage = (form: string) => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(`form--${form}`) || "{}")
    }
}

export const getWebformFromLocalStorageByName = (name: string) => {
    let i;
    let results = {};
    for (i in localStorage) {
        if (localStorage.hasOwnProperty(i)) {
            if (i.match(name) && localStorage.getItem(i)) {
                results = {
                    ...results,
                    [i]: localStorage.getItem(i),
                }
            }
        }
    }
    return results;
}
