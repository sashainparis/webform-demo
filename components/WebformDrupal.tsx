"use client"

import { useState } from 'react';
import YAML from "js-yaml";
import { 
    WebformData, 
    WebformField, 
    WebformObject 
} from '@/utils/drupal/webform_types';
import WebformDrupalField from './WebformDrupalField';
import WebformBox from './WebformBox';

type Props = {
    webform: any,
}

function getElements(elements: string) {
    const values = YAML.load(elements);
    let newValues = {};
    for (const value in values) {
        const key = value;
        const items = values[value];

        let cleanObject = {};
        for (const item in items) {
            const cleanItem = item.slice(1);
            cleanObject = {
                ...cleanObject,
                [cleanItem]: items[item],
            };
        }
        newValues = {
            ...newValues,
            [key]: cleanObject,
        }
    }
    return newValues;
}

export default function WebformDrupal({ webform }: Props) {
    const [message, setMessage]: any = useState([]);
    const values: WebformData = JSON.parse(webform.value);

    const WebformHeader = (webform: WebformObject) => {
        const renderedMessage = message.map((line: string) => (<div>{line}</div>))
        return (
            <>
                <div>
                    {renderedMessage}
                </div>
                <h1 className="text-2xl py-8 font-bold">{webform.title}</h1>
                <div>
                    {webform.description}
                </div>
            </>
        )
    }

    const WebformIsClosed = () => (
        <>
            <div>
                Ce formulaire est actuellement fermé.
            </div>
        </>
    )
    if (values && values?.status !== "open") {
        return (<WebformIsClosed />)
    }

    const webformValues: WebformObject = {
        ...values,
        elements: getElements(values?.elements),
    }

    function renderedWebform(webform: WebformObject) {
        const elements = webform.elements ?? {};
        if (!elements) {
            return (<>
                Erreur de connexion
            </>)
        }

        const fields = Object.values(elements).map((field: WebformField, key) => {
            field = {
                ...field,
                form: webform.id,
            }
            return <WebformDrupalField key={key} field={field} />
        })
        return (
            <>
                <WebformBox>
                    {fields}
                    {/* <Button
                        type="submit"
                        variant="contained"
                        onClick={() => {saveWebform("test")} }
                    >GOGO !!!</Button> */}
                </WebformBox>
            </>
        )
    }

    return (
        <>
            {WebformHeader(webformValues)}
            {renderedWebform(webformValues)}
        </>
    )
}
