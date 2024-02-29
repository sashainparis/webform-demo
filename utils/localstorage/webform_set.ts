
const setWebformToLocalStorage = (name: string, form: string, value: string) => {
    console.log(name);
    console.log(value);
    if (typeof window !== 'undefined') {
        localStorage.setItem(`form--${form}--${name}`, value)
    }
}
