

export const getFieldFromLocalStorage = (name: string, form: string) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(`form--${form}--${name}`) || ""
    }
}

export const getWebformFromLocalStorage = (name: string, form: string) => {
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
