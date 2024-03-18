"use client"

import slugify from 'slugify';
import { setFieldToLocalStorage } from '@/lib/localstorage/webform_set';
import { getFieldFromLocalStorage } from '@/lib/localstorage/webform_get';
import { FieldProps } from './BaseField';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';


export const Field = (({ field }: FieldProps) => {
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
})
