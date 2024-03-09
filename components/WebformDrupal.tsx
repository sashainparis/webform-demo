"use client"

import YAML from "js-yaml";
import {
    WebformData,
    WebformObject
} from '@/utils/drupal/webform_types';
import DashboardCard from './DashboardCard';
import WebformDrupalFields from './WebformDrupalFields';
import WebformDrupalHeader from './WebformDrupalHeader';

type Props = {
    webform: WebformData,
    webformId?: string,
    title?: string,
    noTitle?: boolean,
    multi?: number,
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

export default function WebformDrupal({ webform, webformId, title, noTitle = false, multi }: Props) {
    if (webformId) {
        webform = {
            ...webform,
            id: webformId,
        }
    }
    if (title) {
        webform = {
            ...webform,
            title: title,
        }
    }

    const webformObj: WebformObject = {
        ...webform,
        elements: getElements(webform?.elements),
    }

    return (
        <>
            <DashboardCard title={title ?? webform.title}>
                <WebformDrupalHeader webform={webformObj} noTitle />
                <WebformDrupalFields webform={webformObj} multi={multi} />
            </DashboardCard>
        </>
    )
}
