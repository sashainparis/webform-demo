"use client"

import {
    TextField,
    TextFieldVariants,
    FormControlLabel,
    Checkbox,
    FormControl,
    FormLabel,
    FormGroup,
} from '@mui/material';
import {
    WebformField,
    WebformFieldCheckboxes,
    WebformFieldTextarea
} from "@/utils/drupal/webform_types";
import slugify from 'slugify';
import { setFieldToLocalStorage, setOptionToLocalStorage } from '@/utils/localstorage/webform_set';
import { getFieldFromLocalStorage, getOptionFromLocalStorage } from '@/utils/localstorage/webform_get';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

type Props = {
    field: WebformField,
    variant?: TextFieldVariants,
    key: number,
}

export default function WebformDrupalField({ field }: Props) {
    return loadField(field);
}

function loadField(field: WebformField) {
    let rendered;
    switch (field?.type) {
        case 'textfield': rendered = textfield(field); break;
        case 'textarea': rendered = textarea(field); break;
        case 'email': rendered = email(field); break;
        case 'select': rendered = select(field); break;
        case 'checkbox': rendered = checkbox(field); break;
        //@ts-ignore
        case 'checkboxes': rendered = checkboxes(field); break;
        case 'webform_link': rendered = link(field); break;
        case 'number': rendered = number(field); break;
        case 'date': rendered = date(field); break;
        default: rendered = <></>
    }
    return (rendered);
}

function textfield(field: WebformField) {
    const slug = slugify(field.title);
    const form = field?.form ?? "";
    const multi = field?.multi;
    return <TextField
        label={field.title}
        className="bg-white"
        variant={field.variant}
        defaultValue={getFieldFromLocalStorage(slug, form, multi)}
        onChange={event => setFieldToLocalStorage(form, slug, event.target.value, multi)}
    />
}

function textarea(field: WebformFieldTextarea) {
    const slug = slugify(field.title);
    const form = field?.form ?? "";
    const multi = field?.multi;
    return <TextField
        label={field.title}
        className="bg-white"
        variant={field.variant}
        multiline
        rows={field.rows ?? 4}
        defaultValue={getFieldFromLocalStorage(slug, form, multi)}
        onChange={event => setFieldToLocalStorage(form, slug, event.target.value, multi)}
    />
}

function checkbox(field: WebformField) {
    const form = field?.form ?? "";
    const multi = field?.multi;
    return buildCheckbox(field.title, field.title, form, "", 0, multi);
}

function buildCheckbox(option: string, label: string, form: string, wrapper: string = "", key: number = 0, multi?: number) {
    const slugWrapper = slugify(wrapper);
    const name = slugify(option);
    let defaultValue;
    if (wrapper) {
        defaultValue = (name === getOptionFromLocalStorage(slugWrapper, name, form)) ? true : false;
    } else {
        defaultValue = (name === getFieldFromLocalStorage(name, form, multi)) ? true : false;
    }
    return <FormControlLabel
        key={key}
        value={name}
        id={name}
        control={<Checkbox
            defaultChecked={defaultValue}
            onChange={event => {
                if (wrapper) {
                    name === getOptionFromLocalStorage(slugWrapper, name, form)
                        ? setOptionToLocalStorage(form, slugWrapper, name, "")
                        : setOptionToLocalStorage(form, slugWrapper, name, event.target.value)
                } else {
                    name === getFieldFromLocalStorage(name, form, multi)
                        ? setFieldToLocalStorage(form, name, "", multi)
                        : setFieldToLocalStorage(form, name, event.target.value, multi)
                }
            }}
        />
        }
        label={label}
        labelPlacement="end"
    />
}

function checkboxes(field: WebformFieldCheckboxes) {
    let checkboxes = [];
    const form = field?.form ?? "";
    const multi = field?.multi;
    let i = 0
    for (const option in field.options) {
        const text = field.options[option].split(" -- ");
        const label = text[1] ? `${text[0]} (${text[1]})` : text[0];
        const currentCheckbox = buildCheckbox(option, label, form, field.title, i, multi);
        checkboxes.push(currentCheckbox);
        i++;
    }
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{field.title}</FormLabel>
            <FormGroup aria-label="position" className="py-0">
                {checkboxes}
            </FormGroup>
        </FormControl>
    )
}

function select(field: WebformField) {
    return <TextField
        label={field.title}
        className="bg-white"
        variant={field.variant}
    />
}

function number(field: WebformField) {
    if (field.multiple) {
        const rendered = [1, 2, 3].map(key => buildText(field, key))
        return (
            <FormControl component="fieldset">
                <h3>{field.title}</h3>
                {rendered}
            </FormControl>
        )
    } else {
        return buildText(field);
    }
}

function buildText(field: WebformField, key?: number) {
    const form = field?.form ?? "";
    const slug = (key) ? slugify(`${field.title} ${key}`) : slugify(field.title);
    const multi = field?.multi;
    return <TextField
        key={key}
        label={field.title}
        className="bg-white"
        variant={field.variant}
        defaultValue={getFieldFromLocalStorage(slug, form, multi)}
        onChange={event => setFieldToLocalStorage(form, slug, event.target.value, multi)}
    />
}

function date(field: WebformField) {
    const slug = slugify(field.title);
    const form = field?.form ?? "";
    const multi = field?.multi;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'  >
            <DatePicker
                label={field.title}
                className="bg-slate-100"
                // @ts-ignore
                defaultValue={dayjs(getFieldFromLocalStorage(slug, form, multi))}
                onChange={(newValue) => setFieldToLocalStorage(form, slug, newValue?.toString() ?? "", multi)}
                format="DD/MM/YYYY"
            />
        </LocalizationProvider>
    );
}

function link(field: WebformField) {
    let links;
    if (field.multiple) {
        links = [1, 2, 3].map(key => buildUrl(field, key))
    } else {
        links = buildUrl(field);
    }
    return (
        <FormControl component="fieldset">
            <h3>{field.title}</h3>
            {links}
        </FormControl>
    )
}

function buildUrl(field: WebformField, key?: number) {
    const form = field?.form ?? "";
    const slug = (key) ? slugify(`${field.title} ${key}`) : slugify(field.title);
    const multi = field?.multi;
    return (
        <TextField
            key={key}
            label="URL"
            className="bg-white"
            variant={field.variant}
            defaultValue={getFieldFromLocalStorage(slug, form, multi)}
            onChange={event => setFieldToLocalStorage(form, slug, event.target.value, multi)}
        />
    )
}

function email(field: WebformField) {
    return textfield(field);
}
