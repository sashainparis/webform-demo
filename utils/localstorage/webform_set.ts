
export const setWebformToLocalStorage = (form: string, name: string, value: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(`form--${form}--${name}`, value)
    }
}
