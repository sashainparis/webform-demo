"use client"

import { loadWebformByName } from "@/utils/drupal/webform";
import { WebformData } from "@/utils/drupal/webform_types";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Mission() {
    const params = useParams<{ id: string }>()
    const id = parseInt(params?.id) ?? 0;
    const [loading, setLoading]: any = useState(true);
    const [data, setData]: any = useState();
    const WebformDrupal = dynamic(
        () => import('@/thecontentsystems/webform/WebformDrupal'),
        { ssr: false }
    )

    const getWebform = async () => {
        const item: WebformData = await loadWebformByName("mission");
        setData(item);
    }

    useEffect(() => {
        if (loading) {
            getWebform();
            setLoading(false);
        }
    }, [setData, setLoading]);

    // @ts-ignore
    const webform: WebformData = data;

    if (webform) {
        return (
            <>
                <div className="container mx-auto px-4 xl:px-60" >
                    <WebformDrupal
                        webform={webform}
                        webformId="mission"
                        multi={id}
                        title="Mission"
                        noTitle
                    />
                </div>
            </>
        )
    }
}
