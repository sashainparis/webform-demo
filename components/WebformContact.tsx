"use client"

import {loadWebformByName } from "@/utils/drupal/webform";
import TitlePage from "./TitlePage";
import { useEffect, useState } from "react";

type Props = {
    title: string
}

export default function WebformContact({ title }: Props) {
    const [webform, setWebform]: any = useState();
    const [fetched, setFetched] = useState(false);

    const load = async () => {
        const data = await loadWebformByName('contact');
        setWebform(data);
    }

    useEffect(() => {
        if (!fetched) {
            load();
            setFetched(true);
        }
    }, [load])
    console.log(webform);

    const renderWebform = (<>Webform VIDE</>)

    return (
        <>
            <TitlePage title={title} />
            {renderWebform}
        </>
    )
}
