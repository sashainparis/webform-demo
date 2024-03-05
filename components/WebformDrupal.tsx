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
import DashboardCard from './DashboardCard';

type Props = {
    webform: any,
    webformId?: string,
    title?: string,
    noTitle?: boolean,
    multi?: number,
}

const defaultVariant = "filled"

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

export default function WebformDrupal({ webform, webformId, title, noTitle = false, multi }: Props) {
    // const [message, setMessage]: any = useState([]);
    let values: WebformData = JSON.parse(webform.value);
    if (webformId) {
        values = {
            ...values,
            id: webformId,
        }
    }
    if (title) {
        values = {
            ...values,
            title: title,
        }
    }

    const WebformHeader = (webform: WebformObject) => {
        // const renderedMessage = message.map((line: string, key: number) => (<div key={key}>{line}</div>))
        return (
            <>
                {/* <div>
                    {renderedMessage}
                </div> */}
                {!noTitle && <h2 className="text-2xl py-8 font-bold">{webform.title}</h2>}
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

        const fields = Object.values(elements).map((field: WebformField, key) => {
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

    return (
        <>
            <DashboardCard title={title ?? webform.title}>
                {WebformHeader(webformValues)}
                {renderedWebform(webformValues)}
            </DashboardCard>
        </>
    )
}
