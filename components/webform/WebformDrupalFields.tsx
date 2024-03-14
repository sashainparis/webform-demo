"use client"

import { WebformField, WebformObject } from "@/utils/drupal/webform_types";
import WebformBox from "@/components/webform/WebformBox";
import WebformDrupalField from "@/components/webform/WebformDrupalField";


type Props = {
    webform: WebformObject,
    multi?: number,
}

const defaultVariant = "filled"

export default function WebformDrupalFields({ webform, multi }: Props) {
    let fields;
    if (webform && webform?.status === "closed") {
        fields = (<div>Ce formulaire est actuellement fermé.</div>)
    }

    const elements = webform.elements ?? {};

    fields = Object.values(elements).map((field: WebformField, key) => {
        field = {
            ...field,
            form: webform.id,
            key: key,
            variant: defaultVariant,
            multi: multi,
        }
        return <WebformDrupalField key={key} field={field} />
    })
    return (
        <>
            <WebformBox>
                {fields}
            </WebformBox>
        </>
    )
}