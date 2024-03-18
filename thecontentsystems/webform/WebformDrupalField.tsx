"use client"

import {
    TextFieldVariants,
} from '@mui/material';
import {
    WebformField,
} from "@/utils/drupal/webform_types";
import { Field } from './field';

type Props = {
    field: WebformField,
    variant?: TextFieldVariants,
    key: number,
}

export default function WebformDrupalField({ field }: Props) {
    return <Field field={field} />;
}
